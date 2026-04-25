// API to send custom messages to users
// Place this at: app/api/admin/messages/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAdminAuth } from "@/lib/adminAuth";

// POST - Send message to user
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

    const { userId, title, message, type } = await request.json();

    if (!userId || !title || !message || !type) {
      return NextResponse.json(
        {
          error:
            "Missing fields: userId, title, message, type (info/warning/success/urgent)",
        },
        { status: 400 }
      );
    }

    const allowedTypes = ["info", "warning", "success", "urgent"];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Allowed: ${allowedTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDb();
    const messagesRef = db.collection("customMessages");

    const docRef = await messagesRef.add({
      userId,
      title,
      message,
      type,
      createdAt: Timestamp.now(),
      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        messageId: docRef.id,
        message: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// GET - Get all messages or filter by userId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const db = getDb();
    const messagesRef = db.collection("customMessages");

    let query: FirebaseFirestore.Query = messagesRef;
    if (userId) {
      query = messagesRef.where("userId", "==", userId);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        count: messages.length,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// PUT - Mark message as read
export async function PUT(request: NextRequest) {
  try {
    const { messageId } = await request.json();

    if (!messageId) {
      return NextResponse.json(
        { error: "Missing messageId" },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.collection("customMessages").doc(messageId).update({
      isRead: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message marked as read",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}
