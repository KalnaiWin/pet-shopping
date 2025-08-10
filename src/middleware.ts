import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoute = ["/profile"]
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
    const { nextUrl } = request;

    const isLoggedIn = !!sessionCookie;
    const isOnProtectedRoute = protectedRoute.includes(nextUrl.pathname);
    const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

	if (isLoggedIn && isOnAuthRoute) {
		return NextResponse.redirect(new URL("/profile", request.url));
	}

	if (!isLoggedIn && isOnProtectedRoute) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/profile", "/auth/:path*"], 
};