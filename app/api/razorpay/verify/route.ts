import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";

type VerifyPayload = {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VerifyPayload;

    if (
      !payload?.orderId ||
      !payload?.razorpayOrderId ||
      !payload?.razorpayPaymentId ||
      !payload?.razorpaySignature
    ) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Missing Razorpay secret" },
        { status: 500 }
      );
    }

    const body = `${payload.razorpayOrderId}|${payload.razorpayPaymentId}`;
    const expectedSignature = createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== payload.razorpaySignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await getDb().collection("orders").doc(payload.orderId).update({
      paymentStatus: "paid",
      status: "confirmed",
      razorpayPaymentId: payload.razorpayPaymentId,
      paymentVerifiedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Razorpay verify failed", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
