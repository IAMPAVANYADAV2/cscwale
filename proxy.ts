import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedHosts = new Set([
  "cscwale.com",
  "www.cscwale.com",
  "localhost",
  "127.0.0.1",
]);

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const hostname = request.nextUrl.hostname.toLowerCase();

  if (!allowedHosts.has(hostname)) {
    return new NextResponse("Invalid Host", { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
