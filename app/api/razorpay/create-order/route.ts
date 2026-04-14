import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import {
  requireBoundedText,
  requirePositiveAmount,
} from "@/lib/validation";

type CreateOrderPayload = {
  orderId: string;
  amountInr: number;
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "razorpay-create-order");

    const payload = (await request.json()) as CreateOrderPayload;
    const orderId = requireBoundedText(payload?.orderId, "Order ID");
    const amountInr = requirePositiveAmount(payload?.amountInr, "Amount", {
      max: 100000,
    });

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Missing Razorpay credentials" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(payload.amountInr * 100),
        currency: "INR",
        receipt: orderId,
        notes: {
          orderId,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Razorpay order create failed", details: errorText },
        { status: 502 }
      );
    }

    const data = (await response.json()) as { id: string };

    await getDb().collection("orders").doc(orderId).update({
      razorpayOrderId: data.id,
      amountInr,
    });

    return NextResponse.json({ razorpayOrderId: data.id, keyId });
  } catch (error) {
    console.error("Razorpay create order failed", error);
    const message =
      error instanceof Error ? error.message : "Failed to create Razorpay order";
    const status = message.includes("Too many requests")
      ? 429
      : message.includes("required") || message.includes("must be")
        ? 400
        : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
