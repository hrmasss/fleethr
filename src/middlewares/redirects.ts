import type { NextRequest, NextMiddleware, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function withRedirects(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Redirect to next auth sign in page
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    return middleware(request, event);
  };
}
