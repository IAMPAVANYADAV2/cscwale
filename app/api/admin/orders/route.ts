// API to create/update orders for admin
// Place this at: app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAdminAuth } from "@/lib/adminAuth";

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { userId, serviceName, amount } = await request.json();

    if (!userId || !serviceName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: userId, serviceName, amount" },
        { status: 400 }
      );
    }

    const db = getDb();
    const ordersRef = db.collection("orders");

    const docRef = await ordersRef.add({
      userId,
      serviceName,
      amount: Number(amount),
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json(
      {
        success: true,
        orderId: docRef.id,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, status" },
        { status: 400 }
      );
    }

    const allowedStatuses = ["pending", "processing", "completed", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.collection("orders").doc(orderId).update({
      status,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Order status updated to ${status}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// GET - Get all orders or filter by userId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const db = getDb();
    const ordersRef = db.collection("orders");

    let query: FirebaseFirestore.Query = ordersRef;
    if (userId) {
      query = ordersRef.where("userId", "==", userId);
    }

    const snapshot = await query.get();
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        count: orders.length,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
