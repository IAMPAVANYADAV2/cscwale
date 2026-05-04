import { NextRequest, NextResponse } from "next/server";
import { messagesService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { PaginationOptions, QueryFilters, UpdateMessageInput } from "@/types/admin";

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
      isDeleted: searchParams.get("includeDeleted") === "true",
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    };

    const messages = await messagesService.list(filters, options);

    const { response, status } = successResponse(messages, "Messages retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Messages GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get messages";
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
    const { messageId, action, ...data } = body;

    if (!messageId) {
      const { response, status } = errorResponse("Message ID is required", 400);
      return NextResponse.json(response, { status });
    }

    const updateData: UpdateMessageInput = {
      status:
        data.status ||
        (action === "read" || action === "unread" || action === "replied" ? action : undefined),
      adminNote: data.adminNote,
      adminReply: data.adminReply,
    };

    const message = await messagesService.update(messageId, updateData, auth.uid);

    const { response, status } = successResponse(message, "Message updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update message";
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
    const { messageId } = body;

    if (!messageId) {
      const { response, status } = errorResponse("Message ID is required", 400);
      return NextResponse.json(response, { status });
    }

    const message = await messagesService.delete(messageId, auth.uid);

    const { response, status } = successResponse(message, "Message deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete message";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
