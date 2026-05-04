import { NextRequest, NextResponse } from "next/server";
import { usersService } from "@/lib/adminService";
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
      isBlocked: searchParams.get("isBlocked") ? searchParams.get("isBlocked") === "true" : undefined,
      planId: searchParams.get("planId") || undefined,
      isDeleted: searchParams.get("includeDeleted") === "true",
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    };

    const users = await usersService.list(filters, options);

    const { response, status } = successResponse(users, "Users retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Users GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get users";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
