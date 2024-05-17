import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type UserPermissions = RouterOutput["user"]["getPermissions"];
export type Notices = RouterOutput["notice"]["getAll"];
export type Departments = RouterOutput["department"]["getAll"];
export type Roles = RouterOutput["role"]["getAll"];
export type Employees = RouterOutput["employee"]["getAll"];
export type OrganizationPublicInfo =
  RouterOutput["organization"]["getPublicInfo"];
