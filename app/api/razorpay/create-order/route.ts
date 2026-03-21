import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

type CreateOrderPayload = {
  orderId: string;
  amountInr: number;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateOrderPayload;

    if (!payload?.orderId || !payload?.amountInr) {
      return NextResponse.json(
        { error: "orderId and amountInr are required" },
        { status: 400 }
      );
    }

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
        receipt: payload.orderId,
        notes: {
          orderId: payload.orderId,
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

    await getDb().collection("orders").doc(payload.orderId).update({
      razorpayOrderId: data.id,
      amountInr: payload.amountInr,
    });

    return NextResponse.json({ razorpayOrderId: data.id, keyId });
  } catch (error) {
    console.error("Razorpay create order failed", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
