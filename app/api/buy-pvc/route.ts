import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.name || !payload?.phone || !payload?.address) {
      return NextResponse.json(
        { error: "Name, phone, and address are required" },
        { status: 400 }
      );
    }

    const leadRef = await getDb().collection("leads").add({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      address: payload.address.trim(),
      product: "PVC Cropper Lifetime Access",
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, leadId: leadRef.id });
  } catch (error: any) {
    console.error("PVC Buy lead submission failed", error);
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
  }
}
