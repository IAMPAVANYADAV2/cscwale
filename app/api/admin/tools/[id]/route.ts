import { NextRequest, NextResponse } from "next/server";
import { toolsService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { UpdateToolInput } from "@/types/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;

    const tool = await toolsService.getById(id);
    if (!tool) {
      const { response, status } = errorResponse("Tool not found", 404);
      return NextResponse.json(response, { status });
    }

    const { response, status } = successResponse(tool);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tool GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get tool";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const data: UpdateToolInput = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category,
      icon: body.icon,
      price: body.price === undefined ? undefined : Number(body.price),
      requiredPlan: body.requiredPlan,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
      sortOrder: body.sortOrder,
    };

    const tool = await toolsService.update(id, data, auth.uid);

    const { response, status } = successResponse(tool, "Tool updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tool PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update tool";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;

    const tool = await toolsService.delete(id, auth.uid);

    const { response, status } = successResponse(tool, "Tool deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tool DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete tool";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
