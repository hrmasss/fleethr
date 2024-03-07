"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { credentialsSchema } from "@/schemas/auth";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";

export default function SignInForm() {
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<credentialsSchema>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(userCredentials: credentialsSchema) {
    setError("");
    setLoading(true);

    const response = await signIn("credentials", {
      ...userCredentials,
      callbackUrl: "/app",
      redirect: false,
    });
    setLoading(false);

    if (response?.ok) router.push("/app");
    else if (response?.status === 401) setError("Invalid email or password");
    else setError("Something went wrong! check your network and try again.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {error && (
          <p className="text-center text-[0.8rem] font-medium text-destructive">
            {error}
          </p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-8"
                    placeholder="••••••••"
                    type={passVisible ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 hover:bg-transparent"
                    onClick={() => setPassVisible((prev) => !prev)}
                  >
                    {passVisible ? (
                      <EyeOpenIcon className="h-4 w-4" />
                    ) : (
                      <EyeClosedIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link
          href="/auth/recover-password"
          className="my-2 text-sm text-primary"
        >
          Forgot password?
        </Link>

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? (
            <span className="flex">
              <Spinner className="text-primary-foreground" />
              Signing in, please wait...
            </span>
          ) : (
            "Sign in to your account"
          )}
        </Button>
      </form>
    </Form>
  );
}
