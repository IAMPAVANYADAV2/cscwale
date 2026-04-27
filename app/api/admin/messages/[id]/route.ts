// API to delete messages/contacts
// DELETE /api/admin/messages/{id} (requires admin token)

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const messageId = id;
    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Try messages collection first
    const messageRef = db.collection("messages").doc(messageId);
    const messageDoc = await messageRef.get();

    if (messageDoc.exists) {
      await messageRef.delete();

      await db.collection("adminLogs").add({
        adminId: auth.email,
        messageId,
        action: "delete",
        timestamp: Timestamp.now(),
        details: `Deleted message ${messageId} from messages collection`,
      });

      return NextResponse.json({
        success: true,
        message: "Message deleted successfully",
        deletedId: messageId,
      });
    }

    // Try contacts collection
    const contactRef = db.collection("contacts").doc(messageId);
    const contactDoc = await contactRef.get();

    if (contactDoc.exists) {
      await contactRef.delete();

      await db.collection("adminLogs").add({
        adminId: auth.email,
        messageId,
        action: "delete",
        timestamp: Timestamp.now(),
        details: `Deleted contact ${messageId} from contacts collection`,
      });

      return NextResponse.json({
        success: true,
        message: "Contact deleted successfully",
        deletedId: messageId,
      });
    }

    return NextResponse.json(
      { error: "Message or contact not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      {
        error: "Failed to delete message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET to fetch single message/contact for verification
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    // Await params - required in Next.js 16+
    const { id } = await params;
    const messageId = id;
    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Try to get from messages collection
    try {
      const messageRef = db.collection("messages").doc(messageId);
      const messageDoc = await messageRef.get();

      if (messageDoc.exists) {
        return NextResponse.json({
          success: true,
          data: {
            id: messageDoc.id,
            ...messageDoc.data(),
          },
        });
      }
    } catch (err) {
      console.log("Message not found");
    }

    // Try to get from contacts collection
    try {
      const contactRef = db.collection("contacts").doc(messageId);
      const contactDoc = await contactRef.get();

      if (contactDoc.exists) {
        return NextResponse.json({
          success: true,
          data: {
            id: contactDoc.id,
            ...contactDoc.data(),
          },
        });
      }
    } catch (err) {
      console.log("Contact not found");
    }

    return NextResponse.json(
      { error: "Message not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
