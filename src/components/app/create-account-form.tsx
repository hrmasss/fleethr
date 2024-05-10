"use client";

import { api } from "@/trpc/react";
import { CreateUser } from "@/schemas/user";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, PasswordInput, Text, TextInput, Loader } from "@mantine/core";
import { cn } from "@/lib/utils";

interface Props {
  onSuccess?: () => void;
  className?: string;
}

export function CreateAccountForm({ onSuccess, className }: Props) {
  const { mutate, status, error } = api.user.create.useMutation();
  const [loginError, setLoginError] = useState("");

  const form = useForm<CreateUser>({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: zodResolver(CreateUser),
  });

  const handleSubmit = (data: CreateUser) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      const login = async () => {
        const res = await signIn("credentials", {
          redirect: false,
          email: form.getValues().email,
          password: form.getValues().password,
        });
        if (res?.ok && onSuccess) onSuccess();
      };

      login().catch((error) => {
        console.log(error);
        setLoginError(
          "Account was created, but could not login. Try logging in manually.",
        );
      });
    }
  }, [status, form, onSuccess]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <TextInput
        label="Name"
        placeholder="Your name"
        size="md"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Email address"
        placeholder="user@provider.com"
        type="email"
        size="md"
        required
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Set password"
        mt="md"
        size="md"
        required
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <PasswordInput
        label="Confirm password"
        placeholder="Confirm password"
        mt="md"
        size="md"
        required
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />

      {error && (
        <Text c="red">
          {error.data?.code === "BAD_REQUEST"
            ? error.message
            : "Something went wrong, please try again later"}
        </Text>
      )}

      {loginError && <Text c="red">{loginError}</Text>}

      <Button
        type="submit"
        mt="xl"
        size="md"
        autoContrast
        disabled={status === "pending"}
      >
        {status === "pending" ? (
          <>
            <Loader size={20} color="dark.9" mr="sm" /> Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
