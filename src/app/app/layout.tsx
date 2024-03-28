import AppNavbar from "@/components/app-navbar";
import AppSidebar from "@/components/app-sidebar";
import { getServerAuthSession } from "@/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  console.log(session.user.image);

  return (
    <div className="h-screen lg:flex">
      <aside className="hidden w-fit lg:block">
        <AppSidebar user={session?.user} />
      </aside>
      <AppNavbar className="lg:hidden" />
      <div className="grow overflow-y-auto p-2 md:p-6">{children}</div>
    </div>
  );
}
