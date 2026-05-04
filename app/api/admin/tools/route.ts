import { NextRequest, NextResponse } from "next/server";
import { toolsService } from "@/lib/adminService";
import { successResponse, errorResponse, validateRequired } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { CreateToolInput, PaginationOptions, QueryFilters } from "@/types/admin";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;

    const filters: QueryFilters = {
      isActive: searchParams.get("isActive") ? searchParams.get("isActive") === "true" : undefined,
      category: searchParams.get("category") || undefined,
      isDeleted: searchParams.get("isDeleted") ? searchParams.get("isDeleted") === "true" : undefined,
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "sortOrder",
      sortOrder: (searchParams.get("sortOrder") || "asc") as "asc" | "desc",
      includeDeleted: searchParams.get("includeDeleted") === "true",
    };

    const tools = await toolsService.list(filters, options);

    const { response, status } = successResponse(tools, "Tools retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tools GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get tools";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const body = await request.json();

    const requiredFields = ["title", "slug", "description", "category", "icon", "requiredPlan"];
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      const { response, status } = errorResponse(validationError, 400);
      return NextResponse.json(response, { status });
    }
    if (body.price === undefined || Number.isNaN(Number(body.price))) {
      const { response, status } = errorResponse("price is required", 400);
      return NextResponse.json(response, { status });
    }

    const data: CreateToolInput = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category,
      icon: body.icon,
      price: Number(body.price),
      requiredPlan: body.requiredPlan,
      isActive: body.isActive ?? true,
      isFeatured: body.isFeatured ?? false,
      sortOrder: body.sortOrder ?? 0,
    };

    const tool = await toolsService.create(data, auth.uid);

    const { response, status } = successResponse(tool, "Tool created successfully", 201);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Tools POST error:", error);
    const err = error instanceof Error ? error.message : "Failed to create tool";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
