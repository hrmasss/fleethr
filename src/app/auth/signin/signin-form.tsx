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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken: string | undefined;
}

export default function SigninForm({ providers, csrfToken }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Let&apos;s get you signed in. Don&apos;t have an account?{" "}
          <a href="" className="text-primary">
            Sign up
          </a>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        {providers && (
          <>
            <div className="grid gap-4">
              {Object.values(providers)
                .filter((provider) => provider.type === "oauth")
                .map((oAuthProvider) => (
                  <Button
                    onClick={() =>
                      signIn(oAuthProvider.id, { callbackUrl: "/app"})
                    }
                    key={oAuthProvider.id}
                    variant="outline"
                    className="w-full"
                  >
                    Sign in with {oAuthProvider.name}
                  </Button>
                ))}
            </div>

            <div className="my-8 flex items-center justify-center gap-2">
              <div className="h-[1px] grow bg-border" />
              or
              <div className="h-[1px] grow bg-border" />
            </div>
          </>
        )}
        <div className="grid gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="name@company.com" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="••••••••" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign in to your account</Button>
      </CardFooter>
    </Card>
  );
}
