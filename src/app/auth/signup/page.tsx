import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import HighFive from "@/assets/ui/high-five.png";
import SignUpCard from "./signup-card";
import Image from "next/image";

export default async function SignUpPage() {
  const session = await getServerAuthSession();

  // If the user is already logged in, redirect.
  if (session?.user) redirect("/app");

  const providers = await getProviders();

  return (
    <section className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden items-end justify-center lg:flex">
        <div className="aspect-square max-w-[600px]">
          <Image priority className="dark:invert" src={HighFive} alt="" />
        </div>
      </div>

      <main className="flex items-center justify-center">
        <SignUpCard providers={providers} />
      </main>
    </section>
  );
}
