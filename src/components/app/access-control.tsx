"use client";

import type { UserPermissions } from "@/lib/types";
import { redirect, notFound, usePathname } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

interface Props {
  children: React.ReactNode;
  permissions: UserPermissions;
}

export default function AccessControl({
  children,
  permissions,
}: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();

  if (!permissions) redirect(publicLinks.www);

  const permittedRoutes = permissions.map((permission) => permission.route);

  if (!permittedRoutes?.includes(requestedPath)) notFound();

  return <>{children}</>;
}
