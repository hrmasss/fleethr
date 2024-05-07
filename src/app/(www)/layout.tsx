import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="flex-1 lg:px-12 xl:px-32">{children}</section>
    </div>
  );
}
