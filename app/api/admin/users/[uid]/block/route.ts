import { NextRequest, NextResponse } from "next/server";
import { usersService } from "@/lib/adminService";
import { successResponse, errorResponse, validateRequired } from "@/lib/adminUtils";
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
    const body = await request.json();

    const validationError = validateRequired(body, ["reason"]);
    if (validationError) {
      const { response, status } = errorResponse(validationError, 400);
      return NextResponse.json(response, { status });
    }

    const user = await usersService.block(uid, body.reason, auth.uid);

    const { response, status } = successResponse(user, "User blocked successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User block error:", error);
    const err = error instanceof Error ? error.message : "Failed to block user";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
