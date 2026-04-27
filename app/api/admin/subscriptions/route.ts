// API to manage user subscriptions
// Place this at: app/api/admin/subscriptions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: auth.error || "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { userId, subscriptionTier } = await request.json();

    if (!userId || !subscriptionTier) {
      return NextResponse.json(
        { error: "Missing fields: userId, subscriptionTier" },
        { status: 400 }
      );
    }

    const allowedTiers = ["free", "lite", "trial", "pro"];
    if (!allowedTiers.includes(subscriptionTier)) {
      return NextResponse.json(
        { error: `Invalid tier. Allowed: ${allowedTiers.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.collection("users").doc(userId).update({
      subscriptionTier,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Subscription updated to ${subscriptionTier}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
