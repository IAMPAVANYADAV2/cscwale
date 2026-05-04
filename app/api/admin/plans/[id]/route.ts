import { NextRequest, NextResponse } from "next/server";
import { plansService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { UpdatePlanInput } from "@/types/admin";

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

    const plan = await plansService.getById(id);
    if (!plan) {
      const { response, status } = errorResponse("Plan not found", 404);
      return NextResponse.json(response, { status });
    }

    const { response, status } = successResponse(plan);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Plan GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get plan";
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

    const data: UpdatePlanInput = {
      name: body.name,
      price: body.price === undefined ? undefined : Number(body.price),
      durationDays: body.durationDays === undefined ? undefined : Number(body.durationDays),
      features: body.features,
      toolAccess: body.toolAccess,
      maxUsage: body.maxUsage === undefined ? undefined : Number(body.maxUsage),
      slug: body.slug,
      description: body.description,
      pricing: body.price === undefined ? body.pricing : Number(body.price),
      pricingLabel: body.pricingLabel,
      pricingNote: body.pricingNote,
      maxTools: body.maxUsage === undefined ? body.maxTools : Number(body.maxUsage),
      isActive: body.isActive,
      sortOrder: body.sortOrder,
    };

    const plan = await plansService.update(id, data, auth.uid);

    const { response, status } = successResponse(plan, "Plan updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Plan PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update plan";
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

    const plan = await plansService.delete(id, auth.uid);

    const { response, status } = successResponse(plan, "Plan deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Plan DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete plan";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
