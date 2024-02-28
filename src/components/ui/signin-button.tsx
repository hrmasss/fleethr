"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  return (
    <Button
      onClick={() => signIn("discord", { callbackUrl: "/app" })}
      className="hidden text-xs md:block md:text-sm"
    >
      Sign in
    </Button>
  );
}
