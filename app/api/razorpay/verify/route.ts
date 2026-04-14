import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import { requireBoundedText } from "@/lib/validation";

type VerifyPayload = {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "razorpay-verify");

    const payload = (await request.json()) as VerifyPayload;
    const orderId = requireBoundedText(payload?.orderId, "Order ID");
    const razorpayOrderId = requireBoundedText(
      payload?.razorpayOrderId,
      "Razorpay order ID"
    );
    const razorpayPaymentId = requireBoundedText(
      payload?.razorpayPaymentId,
      "Razorpay payment ID"
    );
    const razorpaySignature = requireBoundedText(
      payload?.razorpaySignature,
      "Razorpay signature"
    );

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Missing Razorpay secret" },
        { status: 500 }
      );
    }

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await getDb().collection("orders").doc(orderId).update({
      paymentStatus: "paid",
      status: "confirmed",
      razorpayPaymentId,
      paymentVerifiedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Razorpay verify failed", error);
    const message =
      error instanceof Error ? error.message : "Payment verification failed";
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
