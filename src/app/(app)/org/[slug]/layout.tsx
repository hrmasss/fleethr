import { Header } from "@/components/www/organization-public-header";
import { Footer } from "@/components/www/footer";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default async function Layout({ children, params }: Props) {
  const organization = await api.organization.getPublicInfo({
    slug: params.slug,
  });

  if (!organization) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header organization={organization} className="px-4 lg:px-12 xl:px-32" />
      <section className="flex-1 p-4 lg:px-12 xl:px-32">{children}</section>
      <Footer className="px-4 lg:px-12 xl:px-32" />
    </div>
  );
}
