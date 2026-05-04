import { NextResponse } from "next/server";
import { toolsService } from "@/lib/adminService";
import { errorResponse, successResponse } from "@/lib/adminUtils";

export async function GET() {
  try {
    const tools = await toolsService.list(
      { isActive: true, isDeleted: false },
      { limit: 100, sortBy: "sortOrder", sortOrder: "asc" }
    );

    const { response, status } = successResponse(tools, "Tools retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Public tools GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get tools";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
