import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";

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
    const payload = (await request.json()) as OrderPayload;

    if (!payload?.name || !payload?.phone || !payload?.comboDetails) {
      return NextResponse.json(
        { error: "name, phone and comboDetails are required" },
        { status: 400 }
      );
    }

    const orderRef = await getDb().collection("orders").add({
      ...payload,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ orderId: orderRef.id });
  } catch (error) {
    console.error("Order create failed", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
