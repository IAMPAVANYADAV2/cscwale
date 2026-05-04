import { NextRequest, NextResponse } from "next/server";
import { toolsService } from "@/lib/adminService";
import { errorResponse, successResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";

type ReorderItem = {
  id: string;
  sortOrder: number;
};

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const body = await request.json();
    const items = body.items as ReorderItem[] | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      const { response, status } = errorResponse("items are required", 400);
      return NextResponse.json(response, { status });
    }

    const updated = await Promise.all(
      items.map((item) => {
        if (!item.id || Number.isNaN(Number(item.sortOrder))) {
          throw new Error("Each reorder item requires id and sortOrder");
        }

        return toolsService.update(item.id, { sortOrder: Number(item.sortOrder) }, auth.uid);
      })
    );

    const { response, status } = successResponse(updated, "Tools reordered successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tools reorder error:", error);
    const err = error instanceof Error ? error.message : "Failed to reorder tools";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
