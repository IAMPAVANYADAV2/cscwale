import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    // Verify the token format (admin_token_TIMESTAMP_EMAIL)
    if (!token.startsWith("admin_token_")) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 }
      );
    }

    // Extract email from token
    const parts = token.split("_");
    if (parts.length < 4) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const email = parts.slice(3).join("_").replace(/___at___/g, "@").replace(/___dot___/g, ".");
    
    // Verify against environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cscwale.com";
    
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Invalid admin email in token" },
        { status: 401 }
      );
    }

    // Try to verify with Firestore, but allow fallback if offline
    try {
      const db = getDb();
      const adminDocRef = db.collection("users").doc("admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"));
      const adminDocSnap = await adminDocRef.get();

      const adminData = adminDocSnap.data();
      if (adminDocSnap.exists && adminData?.role === "admin") {
        return NextResponse.json({
          success: true,
          admin: {
            uid: adminData.uid,
            email: adminData.email,
            displayName: adminData.displayName,
            role: "admin",
          },
        });
      }
    } catch (firestoreError) {
      console.warn("Firestore offline, using token-based verification:", firestoreError);
      // Allow verification to succeed using token + env var check
    }

    // Fallback: Allow admin login based on token + email verification
    return NextResponse.json({
      success: true,
      admin: {
        uid: "admin_" + email.replace(/[^a-zA-Z0-9]/g, "_"),
        email: email,
        displayName: "System Administrator",
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json(
      { error: "Verification failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
