import { NextRequest, NextResponse } from "next/server";
import { usersService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { uid } = await params;

    const user = await usersService.restore(uid, auth.uid);

    const { response, status } = successResponse(user, "User restored successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User restore error:", error);
    const err = error instanceof Error ? error.message : "Failed to restore user";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
