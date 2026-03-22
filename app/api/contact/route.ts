import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";

type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!payload?.name || !payload?.phone || !payload?.message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const contactRef = await getDb().collection("contacts").add({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      message: payload.message.trim(),
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, contactId: contactRef.id });
  } catch (error: any) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
  }
}
