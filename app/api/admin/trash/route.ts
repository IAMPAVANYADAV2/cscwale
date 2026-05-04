import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { verifyAdminAuth } from "@/lib/adminAuth";

const TRASH_SOURCES = [
  { type: "users", collection: "users", label: "User" },
  { type: "plans", collection: "plans", label: "Plan" },
  { type: "tools", collection: "tools", label: "Tool" },
  { type: "messages", collection: "contacts", label: "Message" },
  { type: "messages", collection: "leads", label: "Message" },
  { type: "messages", collection: "messages", label: "Message" },
  { type: "orders", collection: "orders", label: "Order" },
] as const;

type TrashType = (typeof TRASH_SOURCES)[number]["type"];

type FirestoreDateValue =
  | string
  | Date
  | { toDate: () => Date }
  | { seconds?: number; _seconds?: number }
  | null
  | undefined;

function normalizeDate(value: FirestoreDateValue): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if ("toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  const timestampRecord = value as { seconds?: number; _seconds?: number };
  const seconds = timestampRecord.seconds ?? timestampRecord._seconds;
  return typeof seconds === "number" ? new Date(seconds * 1000).toISOString() : null;
}

function getTitle(type: TrashType, data: Record<string, unknown>, fallback: string) {
  if (type === "users") {
    return data.displayName || data.email || data.phone || fallback;
  }

  if (type === "plans") {
    return data.name || data.slug || fallback;
  }

  if (type === "tools") {
    return data.title || data.name || data.slug || fallback;
  }

  if (type === "messages") {
    return data.subject || data.name || data.email || data.phone || data.message || fallback;
  }

  return data.serviceName || data.orderId || data.userName || data.userEmail || fallback;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const type = request.nextUrl.searchParams.get("type") || request.nextUrl.searchParams.get("collection") || "all";
    const db = getDb();
    const trashedItems: Record<string, unknown>[] = [];

    const sourcesToSearch = type === "all"
      ? TRASH_SOURCES
      : TRASH_SOURCES.filter((source) => source.type === type);

    if (sourcesToSearch.length === 0) {
      return NextResponse.json({ error: "Invalid trash type" }, { status: 400 });
    }

    for (const source of sourcesToSearch) {
      try {
        const snapshot = await db.collection(source.collection)
          .where("isDeleted", "==", true)
          .limit(100)
          .get();

        snapshot.forEach((doc) => {
          const data = doc.data();
          const deletedAt = normalizeDate(data.deletedAt as FirestoreDateValue);
          trashedItems.push({
            id: doc.id,
            type: source.type,
            typeLabel: source.label,
            collection: source.collection,
            title: String(getTitle(source.type, data, doc.id)).slice(0, 120),
            deletedAt,
            deletedBy: data.deletedBy || "unknown",
          });
        });
      } catch {
        // Some optional collections may not exist yet.
      }
    }

    trashedItems.sort((a, b) => {
      const aTime = a.deletedAt ? new Date(a.deletedAt as string).getTime() : 0;
      const bTime = b.deletedAt ? new Date(b.deletedAt as string).getTime() : 0;
      return bTime - aTime;
    });

    return NextResponse.json({
      success: true,
      items: trashedItems,
      count: trashedItems.length,
      canPermanentDelete: false,
    });
  } catch (error) {
    console.error("Trash fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch trash" }, { status: 500 });
  }
}
