import { getServerAuthSession } from "@/server/auth";
import { Header } from "@/components/www/header";
import { Footer } from "@/components/www/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = !!(await getServerAuthSession());

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        className="px-4 lg:px-12 xl:px-32"
        isAuthenticated={isAuthenticated}
      />
      <section className="flex-1 px-4 lg:px-12 xl:px-32">{children}</section>
      <Footer className="px-4 lg:px-12 xl:px-32" />
    </div>
  );
}
