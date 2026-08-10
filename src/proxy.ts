import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    const authRoutes = ['/signin'];
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
console.log('fgdgdfgdgdfgdgdfgfdgg');

    const {nextUrl} = request;
    // const {hostName} = request.nextUrl.hostname;
    const nextResponse = NextResponse.next();

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
    console.log('isAuthRoute',isAuthRoute,session && isAuthRoute);
    console.log('isProtectedRoute',isProtectedRoute);


    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!session && isProtectedRoute) {
        const callbackUrl = encodeURIComponent(nextUrl.pathname);
        return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, request.url));
    }
  return NextResponse.next();

  
}

export const config = {
  matcher: ['/signin', '/dashboard/:path*', '/profile/:path*', '/settings/:path*'],

};
