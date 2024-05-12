"use client";

import type { UserPermissions } from "@/lib/types";
import { redirect, notFound, usePathname } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

interface Props {
  children: React.ReactNode;
  userPermissions: UserPermissions;
  isOrganizationOwner: boolean;
}

export default function AccessControlClient({
  children,
  userPermissions,
  isOrganizationOwner,
}: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();

  if (!isOrganizationOwner) {
    if (!userPermissions) redirect(publicLinks.www);

    const permittedRoutes = userPermissions.map(
      (permission) => permission.route,
    );

    if (!permittedRoutes?.includes(requestedPath)) notFound();
  }

  return <>{children}</>;
}
