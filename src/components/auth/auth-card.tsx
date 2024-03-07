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

import DiscordLogo from "@/components/auth/logos/discord";
import GoogleLogo from "@/components/auth/logos/google";

const renderProviderLogo = (providerName: string) => {
  switch (providerName.toLowerCase()) {
    case "google":
      return <GoogleLogo />;
    case "discord":
      return <DiscordLogo />;
    default:
      return null;
  }
};

interface AuthCardProps {
  title: string;
  description: React.ReactNode | string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  form: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  providers,
  form,
}: AuthCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {providers && (
          <div className="grid grid-cols-2 gap-4">
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
                  {renderProviderLogo(oAuthProvider.name)}
                  {oAuthProvider.name}
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

        {form}
      </CardContent>
    </Card>
  );
}
