import { api } from "@/trpc/server";
import { Navbar } from "@/components/app/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";
import { Header } from "@/components/app/header";
import AccessControl from "@/components/app/access-control";
import { AppLayout } from "@/components/app/app-layout";

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
      <AppLayout
        navbar={<Navbar user={user} permittedRoutes={permittedRoutes} />}
        header={<Header user={user} permittedRoutes={permittedRoutes} />}
      >
        {children}
      </AppLayout>
    </AccessControl>
  );
}
