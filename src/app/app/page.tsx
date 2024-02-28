"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  return (
    <main className="flex flex-col justify-center gap-4 px-2 py-8 lg:px-24">
      <h1 className="border-b py-4 text-5xl">Dashboard</h1>
      <div>
        <h2 className="text-3xl">
          {status === "loading" ? "loading..." : `Hello, ${session?.user.name}`}
        </h2>
        <Button className="mt-4" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </main>
  );
}
