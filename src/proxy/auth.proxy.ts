import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "../app/utils/session";
import { UserSession } from "../types/auth.types";
// import { signOutAction } from "../app/(auth)/signin/actions";
import { cookies } from "next/headers";
import { setAuthCookieAction } from "../app/(auth)/signin/actions";

export async function authProxy(
  req: NextRequest,
): Promise<NextResponse | null> {
  const session = req.cookies.get("session")?.value;
  const authRoutes = ["/signin"];
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const cookieStore = await cookies();
  const CLASSBON_URL = process.env.NEXT_PUBLIC_CLASSBON_URL;

  const { nextUrl } = req;
  // const {hostName} = req.nextUrl.hostname;
  const nextResponse = NextResponse.next();
  const callbackUrl = encodeURIComponent(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (!session) {
    if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${callbackUrl}`, req.url),
      );
    }
    return nextResponse;
  }

  try {
    const parsed = (await decryptSession(session as string)) as UserSession;
    const now = Date.now();
    const accessExpired = parsed.exp < now;
    const refreshExpired = parsed.sessionExpiry < now;

    if (!accessExpired && !refreshExpired && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (accessExpired) {
      cookieStore.delete("session");
      try {
        const response = await fetch(`${CLASSBON_URL}/identity/refresh-token`, {
          method: "POST",
          body: JSON.stringify({ sessionId: parsed.sessionId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const user = await response.json();
          await setAuthCookieAction(user);
        }
      } catch {
        return NextResponse.redirect(
          new URL(`/signin?callbackUrl=${callbackUrl}`, req.url),
        );
      }
    }
    if ((accessExpired || refreshExpired) && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${callbackUrl}`, req.url),
      );
    }
  } catch {
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  return nextResponse;
}
