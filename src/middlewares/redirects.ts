import type { NextRequest, NextMiddleware, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function withRedirects(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Map /login to /signin
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.rewrite(new URL("/signin", request.url));
    }

    const user = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect authenticated users to the app
    if (request.nextUrl.pathname === "/" && user) {
      return NextResponse.redirect(new URL("/app", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/app") && !user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return middleware(request, event);
  };
}
