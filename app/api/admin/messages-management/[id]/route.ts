import { NextRequest, NextResponse } from "next/server";
import { messagesService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { UpdateMessageInput } from "@/types/admin";

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

    const message = await messagesService.getById(id);
    if (!message) {
      const { response, status } = errorResponse("Message not found", 404);
      return NextResponse.json(response, { status });
    }

    const { response, status } = successResponse(message);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get message";
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

    const data: UpdateMessageInput = {
      status: body.status,
      adminNote: body.adminNote,
      adminReply: body.adminReply,
    };

    const message = await messagesService.update(id, data, auth.uid);

    const { response, status } = successResponse(message, "Message updated successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message PUT error:", error);
    const err = error instanceof Error ? error.message : "Failed to update message";
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

    const message = await messagesService.delete(id, auth.uid);

    const { response, status } = successResponse(message, "Message deleted successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message DELETE error:", error);
    const err = error instanceof Error ? error.message : "Failed to delete message";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
