import { api } from "@/trpc/server";
import { Navbar } from "@/components/app/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";
import { Header } from "@/components/app/header";
import AccessControl from "@/components/app/access-control";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getServerAuthSession())?.user;
  if (!user) redirect(publicLinks.login);

  const subscribedModules = await api.subscription.getSubscribedModules();
  const userPermissions = await api.user.getPermissions();

  const permittedRoutes = userPermissions?.flatMap(
    (permission) => permission.routes,
  );

  if (!permittedRoutes) redirect(publicLinks.www);
  if (!subscribedModules) redirect(publicLinks.singup);

  return (
    <AccessControl permittedRoutes={permittedRoutes}>
      <div className="flex min-h-screen">
        <aside className="fixed left-0 hidden h-screen lg:block">
          <Navbar user={user} permittedRoutes={permittedRoutes} />
        </aside>
        <div className="flex-1 lg:ml-[300px]">
          <Header
            user={user}
            permittedRoutes={permittedRoutes}
            className="px-4 lg:hidden"
          />
          <div className="p-4 md:p-8 lg:p-12 size-full">{children}</div>
        </div>
      </div>
    </AccessControl>
  );
}
