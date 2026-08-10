import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function authProxy(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    const authRoutes = ['/signin'];
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
console.log('fgdgdfgdgdfgdgdfgfdgg');

    const {nextUrl} = req;
    // const {hostName} = req.nextUrl.hostname;
    const nextResponse = NextResponse.next();

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
    console.log('isAuthRoute',isAuthRoute,session && isAuthRoute);
    console.log('isProtectedRoute',isProtectedRoute);


    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (!session && isProtectedRoute) {
        const callbackUrl = encodeURIComponent(nextUrl.pathname);
        return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, req.url));
    }
return nextResponse;
}

