import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import {
  requireBoundedText,
  requirePhoneNumber,
} from "@/lib/validation";

type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "contact");

    const payload = (await request.json()) as ContactPayload;
    const name = requireBoundedText(payload?.name, "Name");
    const phone = requirePhoneNumber(payload?.phone);
    const message = requireBoundedText(payload?.message, "Message");

    const contactRef = await getDb().collection("contacts").add({
      name,
      phone,
      message,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, contactId: contactRef.id });
  } catch (error: unknown) {
    console.error("Contact form submission failed", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit request";
    const status = message.includes("Too many requests")
      ? 429
      : message.includes("required") || message.includes("must be")
        ? 400
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
