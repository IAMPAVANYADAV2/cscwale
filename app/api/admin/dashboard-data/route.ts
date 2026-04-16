// API to fetch admin dashboard data
// GET all orders, messages, and users for admin dashboard
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

export async function GET(request: NextRequest) {
  try {
    // Check for admin token from headers
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    
    if (!token || !token.startsWith("admin_token_")) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const db = getDb();
    const data: any = {};

    // Fetch orders
    try {
      const ordersSnapshot = await db
        .collection("orders")
        .orderBy("createdAt", "desc")
        .get();
      
      data.orders = [];
      ordersSnapshot.forEach((doc) => {
        const orderData = doc.data();
        data.orders.push({
          id: doc.id,
          userId: orderData.userId || "",
          userEmail: orderData.userEmail || "",
          orderType: orderData.orderType || "service",
          serviceName: orderData.serviceName || "Unknown",
          tier: orderData.tier || null,
          status: orderData.status || "pending",
          amount: orderData.amount || 0,
          description: orderData.description || "",
          createdAt: orderData.createdAt?.toDate?.() || new Date(orderData.createdAt),
          updatedAt: orderData.updatedAt?.toDate?.() || new Date(orderData.updatedAt),
          adminNotes: orderData.adminNotes || "",
        });
      });
    } catch (ordersError) {
      console.error("Error fetching orders:", ordersError);
      data.orders = [];
    }

    // Fetch messages
    try {
      const messagesSnapshot = await db
        .collection("messages")
        .orderBy("createdAt", "desc")
        .get();
      
      data.messages = [];
      messagesSnapshot.forEach((doc) => {
        data.messages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
        });
      });
    } catch (messagesError) {
      console.error("Error fetching messages:", messagesError);
      data.messages = [];
    }

    // Fetch contacts (from contact form submissions)
    try {
      const contactsSnapshot = await db
        .collection("contacts")
        .orderBy("createdAt", "desc")
        .get();
      
      data.contacts = [];
      contactsSnapshot.forEach((doc) => {
        const contactData = doc.data();
        data.contacts.push({
          id: doc.id,
          name: contactData.name || "Unknown",
          email: contactData.email || "",
          phone: contactData.phone || "",
          subject: contactData.subject || "Contact Form Submission",
          message: contactData.message || "",
          type: "contact-form",
          status: contactData.status || "unread",
          createdAt: contactData.createdAt?.toDate?.() || new Date(contactData.createdAt),
        });
      });
    } catch (contactsError) {
      console.error("Error fetching contacts:", contactsError);
      data.contacts = [];
    }

    // Fetch users
    try {
      const usersSnapshot = await db.collection("users").get();
      data.totalUsers = usersSnapshot.size;
    } catch (usersError) {
      console.error("Error fetching users:", usersError);
      data.totalUsers = 0;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Admin dashboard data error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch admin data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
