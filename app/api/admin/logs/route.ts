import { NextRequest, NextResponse } from "next/server";
import { getLogs } from "@/lib/adminService";
import { successResponse, errorResponse } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { PaginationOptions, QueryFilters } from "@/types/admin";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;

    const filters: QueryFilters = {
      resource: (searchParams.get("resource") || undefined) as QueryFilters["resource"],
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "timestamp",
      sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    };

    const logs = await getLogs(filters, options);

    const { response, status } = successResponse(logs, "Logs retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Logs GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get logs";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
