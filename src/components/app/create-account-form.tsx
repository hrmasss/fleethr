"use client";

import { CredentialsSchema } from "@/schemas/auth";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { PasswordInput, TextInput } from "@mantine/core";

interface Props {
  onSubmit: (values: CredentialsSchema) => void;
}

export function CreateAccountForm({ onSubmit }: Props) {
  const form = useForm<CredentialsSchema>({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(CredentialsSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="Email address"
        placeholder="user@provider.com"
        size="md"
        required
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        required
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
    </form>
  );
}
