import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

/**
 * Verifies if the request is from an authenticated admin user
 * Expects Authorization header with admin token
 */
export async function verifyAdminAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return { isAdmin: false, error: "Missing or invalid Authorization header" };
    }

    const token = authHeader.substring(7);

    // Verify token format: admin_token_TIMESTAMP_EMAIL
    if (!token.startsWith("admin_token_")) {
      return { isAdmin: false, error: "Invalid token format" };
    }

    // Extract email from token
    const parts = token.split("_");
    if (parts.length < 4) {
      return { isAdmin: false, error: "Invalid token structure" };
    }

    // Reconstruct email from token (handles ___at___ and ___dot___)
    const emailParts = parts.slice(3).join("_");
    const email = emailParts.replace(/___at___/g, "@").replace(/___dot___/g, ".");
    
    // Verify against environment variable
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cscwale.com";
    
    if (email !== ADMIN_EMAIL) {
      return { isAdmin: false, error: "Token email does not match admin email" };
    }

    // Verify token hasn't expired (token created less than 24 hours ago)
    const tokenParts = token.split("_");
    const timestamp = parseInt(tokenParts[2]);
    const now = Date.now();
    const tokenAgeHours = (now - timestamp) / (1000 * 60 * 60);
    
    if (tokenAgeHours > 24) {
      return { isAdmin: false, error: "Token has expired" };
    }

    return { 
      isAdmin: true, 
      email,
      userData: { role: "admin", email } 
    };
  } catch (error) {
    console.error("Admin auth verification error:", error);
    return { isAdmin: false, error: "Authentication verification failed" };
  }
}

/**
 * Middleware wrapper for admin-only API routes
 */
export async function adminOnlyRoute(
  request: NextRequest,
  handler: (request: NextRequest, context: any) => Promise<NextResponse>
) {
  const auth = await verifyAdminAuth(request);

  if (!auth.isAdmin) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized - Admin access required" },
      { status: 401 }
    );
  }

  return handler(request, { adminId: auth.userId, adminData: auth.userData });
}
