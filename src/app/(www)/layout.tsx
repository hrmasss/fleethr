import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header className="px-4 lg:px-12 xl:px-32" />
      <section className="flex-1 px-4 lg:px-12 xl:px-32">{children}</section>
      <Footer className="px-4 lg:px-12 xl:px-32"/>
    </div>
  );
}
