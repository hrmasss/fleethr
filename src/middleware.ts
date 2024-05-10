import { NextResponse, type NextRequest } from "next/server";
import { publicLinks } from "@/lib/nav-data";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  // Get the user's JWT token
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Routing and authorization logic
  const { nextUrl } = request;
  const isAuthenticatedUser = !!user;

  const isLogoutPath = nextUrl.pathname === publicLinks.logout;
  const isLoginPath = nextUrl.pathname === publicLinks.login;
  const isProtectedRoute = nextUrl.pathname.startsWith(publicLinks.dashboard);

  // Redirect /signin to /login
  if (nextUrl.pathname === "/signin")
    return NextResponse.redirect(new URL(publicLinks.login, request.url));

  // Redirect /signout to /logout
  if (nextUrl.pathname === "/signout")
    return NextResponse.redirect(new URL(publicLinks.logout, request.url));

  // Redirect unauthenticated users from /logout to the login page
  if (isLogoutPath && !isAuthenticatedUser)
    return NextResponse.redirect(new URL(publicLinks.login, request.url));

  // Redirect authenticated users from /login to the dashboard page
  if (isLoginPath && isAuthenticatedUser)
    return NextResponse.redirect(new URL(publicLinks.dashboard, request.url));

  // Prevent unauthenticated users from accessing the app
  if (isProtectedRoute && !isAuthenticatedUser)
    return NextResponse.redirect(new URL(publicLinks.login, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.svg (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.svg).*)",
  ],
};
