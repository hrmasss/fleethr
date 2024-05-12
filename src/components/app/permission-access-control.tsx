"use client";

import type { UserPermissions } from "@/lib/types";
import { redirect, notFound, usePathname } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

interface Props {
  children: React.ReactNode;
  userPermissions: UserPermissions;
}

export default function AccessControlClient({
  children,
  userPermissions,
}: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();

  if (!userPermissions) redirect(publicLinks.www);

  const permittedRoutes = userPermissions.map((permission) => permission.route);

  if (!permittedRoutes?.includes(requestedPath)) notFound();

  return <>{children}</>;
}
