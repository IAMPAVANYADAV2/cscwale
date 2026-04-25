// API to manage custom messages and service requests
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
    const messageType = req.nextUrl.searchParams.get("type") || "all"; // contact, service-request, custom-message

    let query: FirebaseFirestore.Query = db.collection("messages");

    if (messageType !== "all") {
      query = query.where("type", "==", messageType);
    }

    query = query.orderBy("createdAt", "desc");

    const snapshot = await query.limit(500).get();
    const messages: Record<string, unknown>[] = [];

    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      });
    });

    return NextResponse.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", details: error instanceof Error ? error.message : "Unknown error" },
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

    const { messageId, action, adminReply } = await req.json();

    if (!messageId || !action) {
      return NextResponse.json(
        { error: "Missing messageId or action" },
        { status: 400 }
      );
    }

    const validActions = ["read", "reply", "archive", "spam", "follow-up"];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Allowed: ${validActions.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDb();
    const messageRef = db.collection("messages").doc(messageId);

    const updateData: any = {
      status: action,
      updatedAt: Timestamp.now(),
      adminId: auth.email,
    };

    if (adminReply) {
      updateData.adminReply = adminReply;
      updateData.repliedAt = Timestamp.now();
    }

    await messageRef.update(updateData);

    // Log admin action
    await db.collection("adminLogs").add({
      adminId: auth.email,
      messageId,
      action,
      timestamp: Timestamp.now(),
      details: `Updated message ${messageId} - ${action}${adminReply ? " with reply" : ""}`,
    });

    return NextResponse.json({
      success: true,
      message: `Message ${action} successfully`,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
