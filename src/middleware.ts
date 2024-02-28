import { chain } from "@/lib/chain-middlewares";
import { withRedirects } from "@/middlewares/redirects";

const middlewares = [withRedirects];

export default chain(middlewares);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.svg (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.svg).*)",
  ],
};
