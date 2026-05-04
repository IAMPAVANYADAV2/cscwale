import { NextRequest, NextResponse } from "next/server";
import { ordersService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { PaginationOptions, QueryFilters, UpdateOrderInput } from "@/types/admin";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;

    const rawStatus = searchParams.get("status");
    const filters: QueryFilters = {
      status: rawStatus && rawStatus !== "all" ? rawStatus : undefined,
      userId: searchParams.get("userId") || undefined,
      isDeleted: searchParams.get("includeDeleted") === "true",
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    };

    const orders = await ordersService.list(filters, options);

    const { response, status } = successResponse(orders, "Orders retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Orders GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get orders";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, ...data } = body;

    if (!orderId) {
      const { response, status } = errorResponse("Order ID is required", 400);
      return NextResponse.json(response, { status });
    }

    const updateData: UpdateOrderInput = {
      status: data.status,
      paymentStatus: data.paymentStatus,
      adminNotes: data.adminNotes,
      amount: data.amount,
    };

    const order = await ordersService.update(orderId, updateData, auth.uid);

    const { response, status } = successResponse(order, "Order updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Order PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update order";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      const { response, status } = errorResponse("Order ID is required", 400);
      return NextResponse.json(response, { status });
    }

    const order = await ordersService.delete(orderId, auth.uid);

    const { response, status } = successResponse(order, "Order deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Order DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete order";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}

