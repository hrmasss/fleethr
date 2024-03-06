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
import CredentialsSignInForm from "./credentials-signin-form";
import Link from "next/link";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function SignInCard({ providers }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Let&apos;s get you signed in. Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Sign up
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
                  Sign in with {oAuthProvider.name}
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

        <CredentialsSignInForm />
      </CardContent>
    </Card>
  );
}
