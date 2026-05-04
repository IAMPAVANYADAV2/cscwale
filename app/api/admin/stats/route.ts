import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { DashboardStats } from "@/types/admin";

type FirestoreRecord = Record<string, unknown>;

function normalizeOrderStatus(value: unknown): string {
  if (value === "approved") return "completed";
  if (value === "rejected" || value === "declined") return "cancelled";
  return typeof value === "string" ? value : "pending";
}

function notDeleted(item: FirestoreRecord) {
  return item.isDeleted !== true;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const db = getDb();
    const [usersSnap, plansSnap, toolsSnap, ordersSnap, contactsSnap, leadsSnap] = await Promise.all([
      db.collection("users").get(),
      db.collection("plans").get(),
      db.collection("tools").get(),
      db.collection("orders").get(),
      db.collection("contacts").get(),
      db.collection("leads").get(),
    ]);

    const users = usersSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const plans = plansSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const tools = toolsSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const orders = ordersSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const contacts = contactsSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const leads = leadsSnap.docs.map((doc) => doc.data()).filter(notDeleted);
    const allMessages = [...contacts, ...leads];

    const completedOrders = orders.filter((order) => normalizeOrderStatus(order.status) === "completed");
    const cancelledOrders = orders.filter((order) => normalizeOrderStatus(order.status) === "cancelled");
    const paidCompletedOrders = completedOrders.filter((order) => order.paymentStatus === "paid");

    const stats: DashboardStats = {
      totalUsers: users.length,
      activeUsers: users.filter((user) => user.isBlocked !== true).length,
      blockedUsers: users.filter((user) => user.isBlocked === true).length,
      totalPlans: plans.length,
      activePlans: plans.filter((plan) => plan.isActive === true).length,
      totalTools: tools.length,
      activeTools: tools.filter((tool) => tool.isActive === true).length,
      totalOrders: orders.length,
      pendingOrders: orders.filter((order) => normalizeOrderStatus(order.status) === "pending").length,
      approvedOrders: completedOrders.length,
      rejectedOrders: cancelledOrders.length,
      totalMessages: allMessages.length,
      unreadMessages: allMessages.filter((message) => (message.status || "unread") === "unread").length,
      totalLeads: allMessages.length,
      pvcOrders: orders.filter((order) => order.orderType === "pvc").length,
      cropperOrders: orders.filter((order) => order.orderType === "cropper").length,
      serviceRequests: orders.filter((order) => order.orderType === "service").length,
      totalRevenue: paidCompletedOrders.reduce(
        (total, order) => total + (typeof order.amount === "number" ? order.amount : 0),
        0
      ),
      lastUpdated: new Date().toISOString(),
    };

    const { response, status } = successResponse(stats);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Stats error:", error);
    const err = error instanceof Error ? error.message : "Failed to get stats";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
