import { chain } from "@/lib/chain-middlewares";
import { withRedirects } from "@/middlewares/redirects";

const middlewares = [withRedirects];

export default chain(middlewares);

export const config = {
  matcher: ["/login"],
};
