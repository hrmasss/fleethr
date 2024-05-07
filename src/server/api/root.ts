import { userRouter } from "@/server/api/routers/user";
import { organizationRouter } from "@/server/api/routers/organization";
import { subscriptionRouter } from "@/server/api/routers/subscription";
import { moduleRouter } from "@/server/api/routers/modules";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  organization: organizationRouter,
  subscription: subscriptionRouter,
  module: moduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
