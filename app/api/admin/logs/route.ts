// API to fetch admin logs and analytics
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
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
    const logsType = req.nextUrl.searchParams.get("type") || "all";
    const days = parseInt(req.nextUrl.searchParams.get("days") || "7");

    // Calculate date from X days ago
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    let query = db.collection("adminLogs");

    if (logsType !== "all") {
      query = query.where("action", "==", logsType);
    }

    query = query.where("timestamp", ">=", dateFrom).orderBy("timestamp", "desc");

    const snapshot = await query.limit(500).get();
    const logs = [];

    snapshot.forEach((doc) => {
      logs.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString(),
      });
    });

    // Calculate stats
    const stats = {
      totalActions: logs.length,
      approvals: logs.filter((l) => l.action === "approve").length,
      rejections: logs.filter((l) => l.action === "reject").length,
      declines: logs.filter((l) => l.action === "decline").length,
      replies: logs.filter((l) => l.action === "reply").length,
    };

    return NextResponse.json({
      success: true,
      stats,
      logs,
    });
  } catch (error) {
    console.error("Error fetching admin logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin logs", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
