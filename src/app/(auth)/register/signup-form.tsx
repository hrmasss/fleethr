"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserSchema } from "@/schemas/user";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";

export default function SignUpForm() {
  const [passVisible, setPassVisible] = useState(false);
  const [passConfirmVisible, setPassConfirmVisible] = useState(false);
  const { mutate, error, isSuccess, isLoading } =
    api.user.createNew.useMutation();

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<createUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(userData: createUserSchema) {
    mutate(userData);
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Account created successfully!",
        description: "Please sign in to your account.",
      });
      router.push("/login");
    }
  }, [isSuccess, toast, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {error && (
          <p className="text-center text-[0.8rem] font-medium text-destructive">
            {error.message}
          </p>
        )}

        <div className="grid gap-2 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Holden Ford" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-8"
                    placeholder="••••••••"
                    type={passConfirmVisible ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 hover:bg-transparent"
                    onClick={() => setPassConfirmVisible((prev) => !prev)}
                  >
                    {passConfirmVisible ? (
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

        <p className="my-2 text-sm">
          By signing up, you agree to our{" "}
          <Link href="#" className="text-primary">
            terms & conditions
          </Link>
          .
        </p>

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? (
            <span className="flex">
              <Spinner className="text-primary-foreground" />
              Creating your account, please wait...
            </span>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
}
