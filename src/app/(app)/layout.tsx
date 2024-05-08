import { Navbar } from "@/components/app/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { publicLinks } from "@/lib/nav-data";

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
      <section className="flex-1 px-4 lg:px-12 xl:px-32">{children}</section>
    </div>
  );
}
