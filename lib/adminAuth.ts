import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import { getAdminUser } from "@/lib/adminFirebaseService";
import type { User } from "@/types/admin";

export type VerifiedAdmin = {
  isAdmin: true;
  uid: string;
  email: string;
  userData: User;
};

export type AdminAuthFailure = {
  isAdmin: false;
  error: string;
};

export async function verifyAdminAuth(request: NextRequest): Promise<VerifiedAdmin | AdminAuthFailure> {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return { isAdmin: false, error: "Missing or invalid Authorization header" };
    }

    const token = authHeader.substring(7);
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const userData = await getAdminUser(decodedToken.uid);

    if (userData?.role !== "admin" || userData.isDeleted || userData.isBlocked) {
      return { isAdmin: false, error: "Admin access required" };
    }

    return {
      isAdmin: true,
      uid: decodedToken.uid,
      email: userData.email,
      userData,
    };
  } catch (error) {
    console.error("Admin auth verification error:", error);
    return { isAdmin: false, error: "Authentication verification failed" };
  }
}

export async function adminOnlyRoute(
  request: NextRequest,
  handler: (request: NextRequest, context: { adminId: string; adminData: User }) => Promise<NextResponse>
) {
  const auth = await verifyAdminAuth(request);

  if (!auth.isAdmin) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized - Admin access required" },
      { status: 401 }
    );
  }

  return handler(request, { adminId: auth.uid, adminData: auth.userData });
}
