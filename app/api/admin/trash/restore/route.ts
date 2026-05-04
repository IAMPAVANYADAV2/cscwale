import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAdminAuth } from "@/lib/adminAuth";

const ALLOWED_COLLECTIONS = ["orders", "messages", "contacts", "leads", "users", "plans", "tools"];

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { collection, documentId, type } = await request.json();
    const resolvedCollection = collection || (type === "messages" ? "contacts" : type);

    if (!resolvedCollection || !documentId) {
      return NextResponse.json({ error: "Missing collection or documentId" }, { status: 400 });
    }

    if (!ALLOWED_COLLECTIONS.includes(resolvedCollection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
    }

    const db = getDb();
    const docRef = db.collection(resolvedCollection).doc(documentId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    await docRef.update({
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      updatedAt: Timestamp.now(),
    });

    await db.collection("adminLogs").add({
      adminId: auth.email,
      action: "RESTORE",
      timestamp: Timestamp.now(),
      resource: type || resolvedCollection,
      resourceId: documentId,
      details: `Restored ${type || resolvedCollection} document ${documentId}`,
    });

    return NextResponse.json({ success: true, message: "Item restored successfully" });
  } catch (error) {
    console.error("Restore error:", error);
    return NextResponse.json({ error: "Failed to restore item" }, { status: 500 });
  }
}
