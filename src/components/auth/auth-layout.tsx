import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import WavingHand from "@/assets/ui/waving-hand.png";
import Image from "next/image";
import AuthCard from "@/components/auth/auth-card";

interface AuthLayoutProps {
  title: string;
  description: React.ReactNode | string;
  buttonText: "Sign in" | "Sign up";
  form: React.ReactNode;
  redirectUrl?: string;
}

export default async function AuthLayout({
  title,
  description,
  buttonText,
  form,
  redirectUrl = "/app",
}: AuthLayoutProps) {
  const session = await getServerAuthSession();
  if (session?.user) redirect(redirectUrl);

  const providers = await getProviders();

  return (
    <section className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden items-end justify-center lg:flex">
        <div className="aspect-square max-w-[600px]">
          <Image priority className="dark:invert" src={WavingHand} alt="" />
        </div>
      </div>
      <main className="flex items-center justify-center">
        <AuthCard
          title={title}
          description={description}
          buttonText={buttonText}
          providers={providers}
          form={form}
        />
      </main>
    </section>
  );
}
