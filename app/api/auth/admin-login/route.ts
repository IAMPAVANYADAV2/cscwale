import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

// Admin credentials (stored securely in environment variables)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cscwale.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Debug logging
    console.log("=== ADMIN LOGIN DEBUG ===");
    console.log("Received Email:", JSON.stringify(email));
    console.log("Received Password:", JSON.stringify(password));
    console.log("Expected Email:", JSON.stringify(ADMIN_EMAIL));
    console.log("Expected Password:", JSON.stringify(ADMIN_PASSWORD));
    console.log("Email Match:", email === ADMIN_EMAIL);
    console.log("Password Match:", password === ADMIN_PASSWORD);
    console.log("=======================");

    // Verify admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      console.log("❌ Credentials mismatch!");
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    console.log("✅ Credentials matched! Creating admin user...");

    let adminUserData = null;
    
    try {
      // Get Firestore database
      const db = getDb();

      // Create or get admin user in Firestore
      const adminDocRef = db.collection("users").doc("admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"));
      const adminDocSnap = await adminDocRef.get();

      // If admin doesn't exist, create it
      if (!adminDocSnap.exists) {
        console.log("Creating new admin user...");
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
        console.log("✅ Admin user created!");
      } else {
        // Update last login
        console.log("Updating existing admin user...");
        await adminDocRef.update({
          lastLogin: Timestamp.now(),
        });
        console.log("✅ Admin user updated!");
      }

      // Get the admin data
      const adminData = await adminDocRef.get();
      adminUserData = adminData.data();
      console.log("✅ Firestore operations completed!");
    } catch (firestoreError) {
      // Firestore connection failed, but we can still allow login
      console.warn("Firestore connection issue, continuing with basic admin login:", firestoreError);
      adminUserData = {
        uid: "admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"),
        email: email,
        role: "admin",
      };
    }

    console.log("✅ Login successful!");

    // Create admin token (email-safe encoding)
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
    console.error("❌ Admin login error:", error);
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
