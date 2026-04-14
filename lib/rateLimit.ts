import { createHash } from "crypto";
import {
  MAX_REQUESTS_PER_WINDOW,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/validation";

type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

const getClientIdentifier = (request: Request) => {
  const host = request.headers.get("host") || "unknown-host";
  const userAgent = request.headers.get("user-agent") || "unknown-agent";
  const language = request.headers.get("accept-language") || "unknown-language";
  const platform = request.headers.get("sec-ch-ua-platform") || "unknown-platform";
  const mobile = request.headers.get("sec-ch-ua-mobile") || "unknown-mobile";

  // Do not trust spoofable forwarded IP headers directly in route handlers.
  return createHash("sha256")
    .update(`${host}|${userAgent}|${language}|${platform}|${mobile}`)
    .digest("hex");
};

export const assertRateLimit = (
  request: Request,
  key: string,
  options?: { maxRequests?: number; windowMs?: number }
) => {
  const clientId = getClientIdentifier(request);
  const maxRequests = options?.maxRequests ?? MAX_REQUESTS_PER_WINDOW;
  const windowMs = options?.windowMs ?? RATE_LIMIT_WINDOW_MS;
  const now = Date.now();
  const bucketKey = `${key}:${clientId}`;
  const existing = store.get(bucketKey);

  if (!existing || existing.expiresAt <= now) {
    store.set(bucketKey, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return;
  }

  if (existing.count >= maxRequests) {
    throw new Error("Too many requests. Please try again later.");
  }

  existing.count += 1;
  store.set(bucketKey, existing);
};
