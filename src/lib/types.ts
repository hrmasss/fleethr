import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type UserPermissions = RouterOutput["user"]["getPermissions"];
export type SubscribedModules =
  RouterOutput["subscription"]["getSubscribedModules"];
