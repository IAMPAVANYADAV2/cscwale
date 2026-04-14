import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getDb } from "@/lib/firebaseAdmin";
import { assertRateLimit } from "@/lib/rateLimit";
import {
  optionalBoundedText,
  requireBoundedText,
  requireEnum,
} from "@/lib/validation";

type ToolEventPayload = {
  eventName?: string;
  plan?: "trial" | "lite" | "pro";
  section?: string;
  label?: string;
  href?: string;
};

export async function POST(request: Request) {
  try {
    assertRateLimit(request, "tools-events");

    const payload = (await request.json()) as ToolEventPayload;
    const eventName = requireBoundedText(payload?.eventName, "Event name");
    const plan = payload.plan
      ? requireEnum(payload.plan, ["trial", "lite", "pro"] as const, "Plan")
      : null;
    const section = optionalBoundedText(payload?.section, "Section");
    const label = optionalBoundedText(payload?.label, "Label");
    const href = optionalBoundedText(payload?.href, "Href");

    const userAgent = request.headers.get("user-agent");
    const language = request.headers.get("accept-language") || "unknown-language";
    const platform = request.headers.get("sec-ch-ua-platform") || "unknown-platform";
    const host = request.headers.get("host") || "unknown-host";
    const clientFingerprint = createHash("sha256")
      .update(`${host}|${userAgent || "unknown-agent"}|${language}|${platform}`)
      .digest("hex");

    const eventRef = await getDb().collection("toolsPageEvents").add({
      eventName,
      plan,
      section: section || null,
      label: label || null,
      href: href || null,
      page: "/tools",
      userAgent: optionalBoundedText(userAgent, "User agent") || null,
      clientFingerprint,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, eventId: eventRef.id });
  } catch (error: unknown) {
    console.error("Tools page event logging failed", error);

    const message =
      error instanceof Error ? error.message : "Failed to log event";

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
