// API to fetch admin dashboard data
// GET all orders, messages, and users for admin dashboard
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const db = getDb();
    const data: {
      orders: Record<string, unknown>[];
      messages: Record<string, unknown>[];
      contacts: Record<string, unknown>[];
      leads: Record<string, unknown>[];
      totalUsers?: number;
    } = {
      orders: [],
      messages: [],
      contacts: [],
      leads: [],
    };

    // Fetch orders
    try {
      const ordersSnapshot = await db
        .collection("orders")
        .orderBy("createdAt", "desc")
        .get();
      
      data.orders = [];
      ordersSnapshot.forEach((doc) => {
        const orderData = doc.data();
        if (orderData.isDeleted === true) return;
        data.orders.push({
          id: doc.id,
          orderId: orderData.orderId || doc.id,
          userId: orderData.userId || orderData.phone || "",
          userName: orderData.userName || orderData.name || "",
          userEmail: orderData.userEmail || "",
          serviceId: orderData.serviceId || orderData.orderType || "service",
          orderType: orderData.orderType || "service",
          serviceName: orderData.serviceName || orderData.comboDetails || "Unknown",
          tier: orderData.tier || null,
          status: orderData.status === "approved" ? "completed" : orderData.status === "rejected" || orderData.status === "declined" ? "cancelled" : orderData.status || "pending",
          paymentStatus: orderData.paymentStatus || "unpaid",
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
        if (doc.data().isDeleted === true) return;
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
        if (contactData.isDeleted === true) return;
        data.contacts.push({
          id: doc.id,
          name: contactData.name || "Unknown",
          email: contactData.email || "",
          phone: contactData.phone || "",
          subject: contactData.subject || "Contact Form Submission",
          message: contactData.message || "",
          type: "contact-form",
          status: contactData.status === "read" || contactData.status === "replied" ? contactData.status : "unread",
          adminNote: contactData.adminNote || "",
          createdAt: contactData.createdAt?.toDate?.() || new Date(contactData.createdAt),
          updatedAt: contactData.updatedAt?.toDate?.() || contactData.updatedAt || null,
        });
      });
    } catch (contactsError) {
      console.error("Error fetching contacts:", contactsError);
      data.contacts = [];
    }

    // Fetch software leads (Trial/Lite/Pro inquiries)
    try {
      const leadsSnapshot = await db
        .collection("leads")
        .orderBy("createdAt", "desc")
        .get();

      data.leads = [];
      leadsSnapshot.forEach((doc) => {
        const leadData = doc.data();
        if (leadData.isDeleted === true) return;
        data.leads.push({
          id: doc.id,
          name: leadData.name || "Unknown",
          email: leadData.email || "",
          phone: leadData.phone || "",
          subject: leadData.subject || `${leadData.product || "Software"} Inquiry`,
          message: leadData.message || `${leadData.name || "Lead"} requested follow-up for ${leadData.product || leadData.plan || "software"}.`,
          type: "contact-form",
          status: leadData.status === "read" || leadData.status === "replied" ? leadData.status : "unread",
          adminNote: leadData.adminNote || "",
          plan: leadData.plan || "",
          product: leadData.product || "",
          address: leadData.address || "",
          createdAt: leadData.createdAt?.toDate?.() || new Date(leadData.createdAt),
          updatedAt: leadData.updatedAt?.toDate?.() || leadData.updatedAt || null,
        });
      });
    } catch (leadsError) {
      console.error("Error fetching leads:", leadsError);
      data.leads = [];
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
