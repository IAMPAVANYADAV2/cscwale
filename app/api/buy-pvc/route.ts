import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import {
  optionalBoundedText,
  requireBoundedText,
  requireEnum,
  requirePhoneNumber,
} from "@/lib/validation";

type BuyPlan = "trial" | "lite" | "pro";

type BuyPayload = {
  name?: string;
  phone?: string;
  address?: string;
  plan?: BuyPlan;
  sourcePage?: string;
  sourceSection?: string;
};

const productByPlan: Record<BuyPlan, string> = {
  trial: "ePVC Cropper Trial Mode",
  lite: "ePVC Cropper Lite Version",
  pro: "ePVC Cropper Pro Version",
};

const priceByPlan: Record<BuyPlan, number> = {
  trial: 0,
  lite: 399,
  pro: 599,
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "buy-pvc");

    const payload = (await request.json()) as BuyPayload;
    const name = requireBoundedText(payload?.name, "Name");
    const phone = requirePhoneNumber(payload?.phone);
    const address = requireBoundedText(payload?.address, "Address");
    const plan = payload.plan
      ? requireEnum(payload.plan, ["trial", "lite", "pro"] as const, "Plan")
      : "pro";
    const sourcePage = optionalBoundedText(payload.sourcePage, "Source page");
    const sourceSection = optionalBoundedText(
      payload.sourceSection,
      "Source section"
    );

    const timestamp = FieldValue.serverTimestamp();
    const leadRef = await getDb().collection("leads").add({
      name,
      phone,
      email: "",
      subject: `${productByPlan[plan]} Inquiry`,
      message: `${name} requested follow-up for ${productByPlan[plan]}. Address/CSC: ${address}`,
      address,
      plan,
      product: productByPlan[plan],
      amount: priceByPlan[plan],
      sourcePage: sourcePage || null,
      sourceSection: sourceSection || null,
      leadType: "tools_page_inquiry",
      status: "unread",
      adminNote: "",
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return NextResponse.json({ success: true, leadId: leadRef.id });
  } catch (error: unknown) {
    console.error("PVC Buy lead submission failed", error);

    const message =
      error instanceof Error ? error.message : "Failed to submit request";

    const status = message.includes("Too many requests")
      ? 429
      : message.includes("required") ||
          message.includes("must be") ||
          message.includes("invalid")
        ? 400
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
