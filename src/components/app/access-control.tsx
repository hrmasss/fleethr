"use client";

import { notFound, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  permittedRoutes: string[];
}

export default function AccessControl({ children, permittedRoutes }: Props) {
  const requestedPath = usePathname();
  if (!requestedPath) notFound();

  const isRoutePermitted = permittedRoutes.some((route) => {
    /**
     * ? Replace any dynamic segment (e.g., [id]) with a regular expression pattern
     * ? ([^/]+) that matches one or more non-slash characters
     *
     * * If /foo/[id] is in permitted routes
     * * /foo/123 will pass the regEx
     * * /foo/123/bar will not
     */
    const routeRegex = new RegExp(
      `^${route.replace(/\[(.*?)\]/g, "([^/]+)")}$`,
    );
    return routeRegex.test(requestedPath);
  });

  if (!isRoutePermitted) notFound();

  return <>{children}</>;
}
