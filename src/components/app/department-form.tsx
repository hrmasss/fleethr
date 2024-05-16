"use client";

import { api } from "@/trpc/react";
import { useEffect } from "react";
import { CreateDepartment } from "@/schemas/department";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { cn } from "@/lib/utils";
import {
  Button,
  Text,
  TextInput,
  Textarea,
  Loader,
} from "@mantine/core";

interface Props {
  className?: string;
}

export function DepartmentForm({ className }: Props) {
  const { mutate, status, error } = api.department.create.useMutation();
  const router = useRouter();

  const form = useForm<CreateDepartment>({
    mode: "controlled",
    initialValues: {
      name: "",
      description: "",
    },

    validate: zodResolver(CreateDepartment),
  });

  const handleSubmit = (data: CreateDepartment) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Department has been added!",
        message: "Please refresh the page if you don't see the department.",
        withBorder: true,
      });

      router.push("/app/departments/manage");
    }
  }, [status, router]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <TextInput
        required
        label="Name"
        placeholder="Name of the department"
        size="md"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Textarea
        label="Description"
        placeholder="Short description of the department"
        size="md"
        autosize
        minRows={3}
        maxRows={5}
        key={form.key("description")}
        {...form.getInputProps("description")}
      />

      {error && (
        <Text c="red">
          {error.data?.code === "BAD_REQUEST"
            ? error.message
            : "Something went wrong, please try again later"}
        </Text>
      )}

      <Button
        type="submit"
        mt="xl"
        size="md"
        autoContrast
        disabled={status === "pending"}
      >
        {status === "pending" ? (
          <>
            <Loader size={20} color="dark.9" mr="sm" /> Adding department...
          </>
        ) : (
          "Add department"
        )}
      </Button>
    </form>
  );
}
