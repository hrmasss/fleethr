"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./signup-form";
import Link from "next/link";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function SignUpCard({ providers }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
        <CardDescription>
          Let&apos;s get you onboard. Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary">
            Sign in
          </Link>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        {providers && (
          <div className="grid gap-4">
            {Object.values(providers)
              .filter((provider) => provider.type === "oauth")
              .map((oAuthProvider) => (
                <Button
                  onClick={() =>
                    signIn(oAuthProvider.id, { callbackUrl: "/app" })
                  }
                  key={oAuthProvider.id}
                  variant="outline"
                  className="w-full ring-1 ring-primary"
                >
                  Sign up with {oAuthProvider.name}
                </Button>
              ))}
          </div>
        )}

        {providers && (
          <div className="my-8 flex items-center justify-center gap-2">
            <div className="h-[1px] grow bg-border" />
            or
            <div className="h-[1px] grow bg-border" />
          </div>
        )}

        <SignUpForm />
      </CardContent>
    </Card>
  );
}
