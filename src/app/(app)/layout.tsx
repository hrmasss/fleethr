import { Navbar } from "@/components/app/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";
import { Header } from "@/components/app/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getServerAuthSession())?.user;

  if (!user) redirect(publicLinks.login);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden h-screen lg:block">
        <Navbar user={user} />
      </aside>
      <section className="flex-1">
        <Header user={user} className="px-4 lg:hidden" />
        {children}
      </section>
    </div>
  );
}
