import { NextRequest, NextResponse } from "next/server";
import { usersService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { UpdateUserInput } from "@/types/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { uid } = await params;

    const user = await usersService.getByUid(uid);
    if (!user) {
      const { response, status } = errorResponse("User not found", 404);
      return NextResponse.json(response, { status });
    }

    const { response, status } = successResponse(user);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get user";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}

export async function PUT(
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

    if (body.planId || body.planName || body.subscriptionTier) {
      const user = await usersService.assignPlan(
        uid,
        body.planId || body.planName || body.subscriptionTier,
        auth.uid
      );
      const { response, status } = successResponse(user, "User plan assigned successfully");
      return NextResponse.json(response, { status });
    }

    const data: UpdateUserInput = {
      displayName: body.displayName,
      photoURL: body.photoURL,
    };

    const user = await usersService.update(uid, data, auth.uid);

    const { response, status } = successResponse(user, "User updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update user";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { uid } = await params;

    const user = await usersService.delete(uid, auth.uid);

    const { response, status } = successResponse(user, "User deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("User DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete user";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
