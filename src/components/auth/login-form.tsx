"use client";

import { protectedLinks, publicLinks } from "@/lib/nav-data";
import { CredentialsSchema } from "@/schemas/auth";
import classes from "@/styles/components/login-form.module.css";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CredentialsSchema>({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(CredentialsSchema),
  });

  const handleSubmit = async (data: CredentialsSchema) => {
    setError("");
    setLoading(true);

    const response = await signIn("credentials", {
      ...data,
      callbackUrl: protectedLinks.dashboard,
      redirect: false,
    });

    if (response?.ok) router.push(protectedLinks.dashboard);
    else if (response?.status === 401) setError("Invalid email or password");
    else setError("Something went wrong, try again later");

    setLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} px={30} py={60}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to FleetHR!
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
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

          {!error && <Text c="red">{error}</Text>}

          <Button type="submit" fullWidth mt="xl" size="md" autoContrast>
            {loading ? (
              <>
                <Loader size={20} color="dark.9" mr="sm" /> Trying to login...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} href={publicLinks.singup} fw={700}>
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
