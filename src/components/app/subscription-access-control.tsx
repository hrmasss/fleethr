"use client";

import type { SubscribedModules } from "@/lib/types";
import { redirect, notFound, usePathname } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

interface Props {
  children: React.ReactNode;
  subscribedModules: SubscribedModules;
}

export default function SubscriptionAccessControl({
  children,
  subscribedModules,
}: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();

  if (!subscribedModules) redirect(publicLinks.singup);

  const subscribedRoutes = subscribedModules.map((module) => module.baseRoute);

  if (!subscribedRoutes?.includes(requestedPath)) notFound();

  return <>{children}</>;
}
