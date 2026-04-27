import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

// Admin credentials (stored securely in environment variables)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cscwale.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Verify admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    let adminUserData = null;

    try {
      const db = getDb();

      const adminDocRef = db.collection("users").doc("admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"));
      const adminDocSnap = await adminDocRef.get();

      if (!adminDocSnap.exists) {
        await adminDocRef.set({
          uid: "admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"),
          email: email,
          displayName: "System Administrator",
          photoURL: null,
          role: "admin",
          createdAt: Timestamp.now(),
          lastLogin: Timestamp.now(),
          isActive: true,
          permissions: [
            "view_all_users",
            "manage_orders",
            "manage_messages",
            "manage_subscriptions",
            "system_settings",
          ],
        });
      } else {
        await adminDocRef.update({
          lastLogin: Timestamp.now(),
        });
      }

      const adminData = await adminDocRef.get();
      adminUserData = adminData.data();
    } catch (firestoreError) {
      // Firestore connection failed, but we can still allow login
      console.warn("Firestore connection issue, continuing with basic admin login:", firestoreError);
      adminUserData = {
        uid: "admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"),
        email: email,
        role: "admin",
      };
    }

    const emailSafe = email.replace(/@/g, "___at___").replace(/\./g, "___dot___");
    const adminToken = `admin_token_${Date.now()}_${emailSafe}`;

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: {
        uid: adminUserData?.uid || "admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"),
        email: adminUserData?.email || email,
        role: "admin",
      },
      token: adminToken,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
