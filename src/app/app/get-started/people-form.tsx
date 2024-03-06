"use client";

import { api } from "@/trpc/react";
import { createUserSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CaretRightIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function PeopleForm() {
  const [passVisible, setPassVisible] = useState(false);
  const [passConfirmVisible, setPassConfirmVisible] = useState(false);
  const { mutate, error, isSuccess, isLoading } = api.user.create.useMutation();

  const { toast } = useToast();

  const form = useForm<createUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "EMPLOYEE",
    },
  });

  function onSubmit(values: createUserSchema) {
    mutate(values);
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: "User account created successfully.",
      });

      form.reset();
    }
  }, [isSuccess, toast, form]);

  return (
    <div>
      <h3 className="text-xl font-bold">Add users (optional)</h3>
      <p className="text-sm text-muted-foreground">
        You can add some users now or you can skip this step and add them later.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the role of the user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    <SelectItem value="HRADMIN">HR Admin</SelectItem>
                  </SelectContent>
                </Select>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
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

          <div className="grid gap-4 md:grid-cols-2">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "Adding user..." : "Add user"}
            </Button>

            <Button asChild size="lg" variant="outline" type="button">
              <Link
                href="/app"
                className="group order-1 flex items-center font-semibold text-primary"
              >
                Go to dashboard
                <CaretRightIcon className="h-6 w-6 transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
