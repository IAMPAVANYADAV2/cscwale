// API to delete messages/contacts
// DELETE /api/admin/messages/{id} (requires admin token)

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const token = authHeader.substring(7);

    // Verify token format
    if (!token.startsWith("admin_token_")) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 }
      );
    }

    const messageId = params.id;
    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Try to delete from messages collection
    try {
      const messageRef = db.collection("messages").doc(messageId);
      const messageDoc = await messageRef.get();

      if (messageDoc.exists) {
        await messageRef.delete();
        return NextResponse.json({
          success: true,
          message: "Message deleted successfully",
          deletedId: messageId,
        });
      }
    } catch (err) {
      console.log("Message not found in messages collection, trying contacts...");
    }

    // Try to delete from contacts collection
    try {
      const contactRef = db.collection("contacts").doc(messageId);
      const contactDoc = await contactRef.get();

      if (contactDoc.exists) {
        await contactRef.delete();
        return NextResponse.json({
          success: true,
          message: "Contact deleted successfully",
          deletedId: messageId,
        });
      }
    } catch (err) {
      console.log("Contact not found in contacts collection");
    }

    // If not found in either collection
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
  { params }: { params: { id: string } }
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

    const messageId = params.id;
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
