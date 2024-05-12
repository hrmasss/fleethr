"use client";

import type { SubscribedModules, UserPermissions } from "@/lib/types";
import { redirect, notFound, usePathname } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

interface Props {
  children: React.ReactNode;
  subscribedModules: SubscribedModules;
  userPermissions: UserPermissions;
}

export default function AccessControlClient({
  children,
  subscribedModules,
  userPermissions,
}: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();
  console.log(requestedPath);

  if (!subscribedModules) redirect(publicLinks.singup);
  if (!userPermissions) redirect(publicLinks.www);

  const subscribedRoutes = subscribedModules.map((module) => module.baseRoute);
  const permittedRoutes = userPermissions.map((permission) => permission.route);

  if (
    !permittedRoutes?.includes(requestedPath) ||
    !subscribedRoutes?.includes(requestedPath)
  ) {
    notFound();
  }

  return <>{children}</>;
}
