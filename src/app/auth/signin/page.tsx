import { getProviders, getCsrfToken } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import WavingHand from "@/assets/ui/welcome-hand.png";
import SigninForm from "./signin-form";
import Image from "next/image";

export default async function SigninPage() {
  const session = await getServerAuthSession();

  // If the user is already logged in, redirect.
  if (session?.user) redirect("/app");

  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <section className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden items-end justify-center lg:flex">
        <div className="aspect-square max-w-[600px]">
          <Image className="dark:invert" src={WavingHand} alt="" />
        </div>
      </div>

      <main className="flex items-center justify-center">
        <SigninForm providers={providers} csrfToken={csrfToken} />
      </main>
    </section>
  );
}
