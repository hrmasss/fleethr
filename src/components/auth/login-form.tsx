"use client";

import { publicLinks } from "@/lib/nav-data";
import { Credentials } from "@/schemas/auth";
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

  const form = useForm<Credentials>({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(Credentials),
  });

  const handleSubmit = (data: Credentials) => {
    const login = async () => {
      setError("");
      setLoading(true);
      const response = await signIn("credentials", {
        ...data,
        callbackUrl: publicLinks.dashboard,
        redirect: false,
      });

      if (response?.ok) router.push(publicLinks.dashboard);
      else if (response?.status === 401) setError("Invalid email or password");
      else setError("Something went wrong, try again later");

      setLoading(false);
    };

    login().catch((error) => {
      console.log(error);
      setError("Something went wrong, try again later");
    });
  };

  return (
    <div className="image-background">
      <Paper
        withBorder
        maw={{ base: "100%", md: 650 }}
        mih="100vh"
        className="ml-auto px-4 py-12 md:px-12 xl:px-32"
        py={60}
      >
        <Title order={2} ta="center" mt="md" mb={50}>
          Welcome back to FleetHR!
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
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
            placeholder="Your password"
            mt="md"
            size="md"
            required
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          {error && <Text c="red">{error}</Text>}

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            autoContrast
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={20} color="dark.9" mr="sm" /> Trying to log in...
              </>
            ) : (
              "Log in"
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
