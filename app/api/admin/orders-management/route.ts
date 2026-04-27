// API to manage all orders - view, approve, reject, decline
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const db = getDb();
    const orderType = req.nextUrl.searchParams.get("type") || "all"; // pvc, cropper, custom, service
    const status = req.nextUrl.searchParams.get("status") || "all";

    let query: FirebaseFirestore.Query = db.collection("orders");

    if (orderType !== "all") {
      query = query.where("orderType", "==", orderType);
    }

    if (status !== "all") {
      query = query.where("status", "==", status);
    }

    query = query.orderBy("createdAt", "desc");

    const snapshot = await query.limit(1000).get();
    const orders: Record<string, unknown>[] = [];

    snapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
      });
    });

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { orderId, action, notes } = await req.json();

    if (!orderId || !action) {
      return NextResponse.json(
        { error: "Missing orderId or action" },
        { status: 400 }
      );
    }

    const actionToStatus: Record<string, string> = {
      approve: "approved",
      approved: "approved",
      reject: "rejected",
      rejected: "rejected",
      decline: "declined",
      declined: "declined",
      pending: "pending",
      processing: "processing",
      completed: "completed",
    };

    const status = actionToStatus[action];
    if (!status) {
      return NextResponse.json(
        { error: `Invalid action. Allowed: ${Object.keys(actionToStatus).join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDb();
    const orderRef = db.collection("orders").doc(orderId);

    const updateData = {
      status,
      updatedAt: Timestamp.now(),
      adminId: auth.email,
      adminNotes: notes || "",
    };

    await orderRef.update(updateData);

    // Log admin action
    await db.collection("adminLogs").add({
      adminId: auth.email,
      orderId,
      action,
      notes,
      timestamp: Timestamp.now(),
      details: `Changed order ${orderId} status to ${status}`,
    });

    const updatedOrder = await orderRef.get();

    return NextResponse.json({
      success: true,
      message: `Order ${status} successfully`,
      order: {
        id: updatedOrder.id,
        ...updatedOrder.data(),
      },
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const db = getDb();
    await db.collection("orders").doc(orderId).delete();

    // Log deletion
    await db.collection("adminLogs").add({
      adminId: auth.email,
      orderId,
      action: "delete",
      timestamp: Timestamp.now(),
      details: `Deleted order ${orderId}`,
    });

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
