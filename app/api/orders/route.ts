import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import {
  MAX_ORDER_QUANTITY,
  optionalBoundedText,
  optionalEmail,
  requireBoundedText,
  requireEnum,
  requirePhoneNumber,
  requirePositiveInteger,
} from "@/lib/validation";

type OrderPayload = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  comboDetails: string;
  quantity?: number;
  deliveryType?: "pickup" | "delivery";
  notes?: string;
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "orders");

    const payload = (await request.json()) as OrderPayload;
    const name = requireBoundedText(payload?.name, "Name");
    const phone = requirePhoneNumber(payload?.phone);
    const comboDetails = requireBoundedText(
      payload?.comboDetails,
      "Combo details"
    );
    const email = optionalEmail(payload?.email);
    const address = optionalBoundedText(payload?.address, "Address");
    const notes = optionalBoundedText(payload?.notes, "Notes");
    const deliveryType = payload.deliveryType
      ? requireEnum(
          payload.deliveryType,
          ["pickup", "delivery"] as const,
          "Delivery type"
        )
      : "delivery";
    const quantity = requirePositiveInteger(
      payload?.quantity ?? 1,
      "Quantity",
      { min: 1, max: MAX_ORDER_QUANTITY }
    );

    const timestamp = FieldValue.serverTimestamp();
    const orderRef = await getDb().collection("orders").add({
      name,
      userName: name,
      phone,
      email: email || null,
      userEmail: email || "",
      userId: phone,
      address: address || null,
      comboDetails,
      quantity,
      deliveryType,
      notes: notes || null,
      serviceId: "pvc-card",
      serviceName: comboDetails,
      orderType: "pvc",
      amount: 0,
      status: "pending",
      paymentStatus: "unpaid",
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await orderRef.update({ orderId: orderRef.id });

    return NextResponse.json({ orderId: orderRef.id });
  } catch (error) {
    console.error("Order create failed", error);
    const message =
      error instanceof Error ? error.message : "Failed to create order";
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
