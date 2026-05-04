import { NextRequest, NextResponse } from "next/server";
import { plansService } from "@/lib/adminService";
import { successResponse, errorResponse, validateRequired } from "@/lib/adminUtils";
import { verifyAdminAuth } from "@/lib/adminAuth";
import type { CreatePlanInput, PaginationOptions, QueryFilters } from "@/types/admin";

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;

    const filters: QueryFilters = {
      isActive: searchParams.get("isActive") ? searchParams.get("isActive") === "true" : undefined,
      isDeleted: searchParams.get("includeDeleted") === "true",
    };

    const options: PaginationOptions = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "50"),
      sortBy: searchParams.get("sortBy") || "sortOrder",
      sortOrder: (searchParams.get("sortOrder") || "asc") as "asc" | "desc",
    };

    const plans = await plansService.list(filters, options);

    const { response, status } = successResponse(plans, "Plans retrieved successfully");
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Plans GET error:", error);
    const err = error instanceof Error ? error.message : "Failed to get plans";
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

    // Validation
    const requiredFields = ["name", "price", "durationDays", "features", "toolAccess", "maxUsage"];
    const validationError = validateRequired(body, requiredFields);
    if (validationError) {
      const { response, status } = errorResponse(validationError, 400);
      return NextResponse.json(response, { status });
    }

    const data: CreatePlanInput = {
      name: body.name,
      price: Number(body.price),
      durationDays: Number(body.durationDays),
      features: body.features || [],
      toolAccess: body.toolAccess || [],
      maxUsage: Number(body.maxUsage),
      slug: body.slug,
      description: body.description,
      pricing: Number(body.price),
      pricingLabel: body.pricingLabel,
      pricingNote: body.pricingNote,
      maxTools: Number(body.maxUsage),
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder ?? 0,
    };

    const plan = await plansService.create(data, auth.uid);

    const { response, status } = successResponse(plan, "Plan created successfully", 201);
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error("Plans POST error:", error);
    const err = error instanceof Error ? error.message : "Failed to create plan";
    const { response, status } = errorResponse(err, 500);
    return NextResponse.json(response, { status });
  }
}
