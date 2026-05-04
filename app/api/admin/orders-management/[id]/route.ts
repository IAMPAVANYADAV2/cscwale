import { NextRequest, NextResponse } from "next/server";
import { ordersService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { UpdateOrderInput } from "@/types/admin";

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

    const order = await ordersService.getById(id);
    if (!order) {
      const { response, status } = errorResponse("Order not found", 404);
      return NextResponse.json(response, { status });
    }

    const { response, status } = successResponse(order);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Order GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get order";
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

    const data: UpdateOrderInput = {
      status: body.status,
      paymentStatus: body.paymentStatus,
      adminNotes: body.adminNotes,
      amount: body.amount,
    };

    const order = await ordersService.update(id, data, auth.uid);

    const { response, status } = successResponse(order, "Order updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Order PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update order";
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

    const order = await ordersService.delete(id, auth.uid);

    const { response, status } = successResponse(order, "Order deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Order DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete order";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
