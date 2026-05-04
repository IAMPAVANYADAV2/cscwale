import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);

  if (!auth.isAdmin) {
    return NextResponse.json(
      { error: auth.error || "Admin access required" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    admin: auth.userData,
  });
}
