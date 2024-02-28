import type { NextRequest, NextMiddleware, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function withRedirects(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Redirect to next auth sign in page
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    const user = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect authenticated users to the app
    if (request.nextUrl.pathname === "/" && user) {
      return NextResponse.redirect(new URL("/app", request.url));
    }

    return middleware(request, event);
  };
}
