import { NextRequest, NextResponse } from "next/server";
import { messagesService } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;

    const message = await messagesService.restore(id, auth.uid);

    const { response, status } = successResponse(message, "Message restored successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Message restore error:", error);
    const err = error instanceof Error ? error.message : "Failed to restore message";
    const { response, status } = errorResponse(err, error instanceof Error && error.message.includes("not found") ? 404 : 500);
    return NextResponse.json(response, { status });
  }
}
