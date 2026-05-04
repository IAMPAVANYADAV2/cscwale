import { NextRequest, NextResponse } from "next/server";
import { usersService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(
  request: NextRequest,
  context: { params: Promise<unknown> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { uid } = (await context.params) as { uid: string };
    const body = await request.json();
    const planId = body.planId || body.planName || body.subscriptionTier;

    if (!planId || typeof planId !== "string") {
      const { response, status } = errorResponse("planId is required", 400);
      return NextResponse.json(response, { status });
    }

    const user = await usersService.assignPlan(uid, planId, auth.uid);
    const { response, status } = successResponse(user, "User plan assigned successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User plan assignment error:", error);
    const err = error instanceof Error ? error.message : "Failed to assign plan";
    const statusCode =
      err.includes("not found") ? 404 : err.includes("Disabled plan") ? 400 : 500;
    const { response, status } = errorResponse(err, statusCode);
    return NextResponse.json(response, { status });
  }
}
