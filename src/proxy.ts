import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authProxy } from "./proxy/auth.proxy";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const authResult = authProxy(request);

  if (authResult) {
    return authResult;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|woff|woff2|ttf|eot)$).*)",
  ],
};
