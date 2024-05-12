import { api } from "@/trpc/server";
import { Navbar } from "@/components/app/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";
import { Header } from "@/components/app/header";
import PermissionAccessControl from "@/components/app/permission-access-control";
import SubscriptionAccessControl from "@/components/app/subscription-access-control";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getServerAuthSession())?.user;
  if (!user) redirect(publicLinks.login);

  const subscribedModules = await api.subscription.getSubscribedModules();
  const userPermissions = await api.user.getPermissions();
  const userOrganization = await api.organization.get();

  if (!subscribedModules) redirect(publicLinks.singup);

  return (
    <SubscriptionAccessControl subscribedModules={subscribedModules}>
      <PermissionAccessControl
        userPermissions={userPermissions}
        isOrganizationOwner={userOrganization?.ownerId === user.id}
      >
        <div className="flex min-h-screen">
          <aside className="fixed left-0 hidden h-screen lg:block">
            <Navbar user={user} />
          </aside>
          <section className="flex-1 lg:ml-[300px]">
            <Header user={user} className="px-4 lg:hidden" />
            {children}
          </section>
        </div>
      </PermissionAccessControl>
    </SubscriptionAccessControl>
  );
}
