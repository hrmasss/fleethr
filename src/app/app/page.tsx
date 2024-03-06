import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      organization: {
        include: {
          subscription: true,
        },
      },
    },
  });

  // Redirect new users to the get started flow
  if (!user?.organization?.subscription) redirect("/app/get-started");

  return (
    <main className="flex flex-col justify-center gap-4 px-2 py-8 lg:px-24">
      <h1 className="border-b py-4 text-5xl">Dashboard</h1>
      <div>
        <h2 className="text-3xl">Hello, {session.user.name}</h2>
        <Button asChild className="mt-4">
          <Link href="/auth/signout">Sign out</Link>
        </Button>
      </div>
    </main>
  );
}
