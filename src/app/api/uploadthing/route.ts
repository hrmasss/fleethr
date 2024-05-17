import { createRouteHandler } from "uploadthing/next";
import { fileUploadRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: fileUploadRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
