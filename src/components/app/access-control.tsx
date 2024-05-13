"use client";

import { notFound, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  permittedRoutes: string[];
}

export default function AccessControl({ children, permittedRoutes }: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();
  if (!permittedRoutes.includes(requestedPath)) notFound();

  return <>{children}</>;
}
