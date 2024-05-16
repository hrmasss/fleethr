"use client";

import { api } from "@/trpc/react";
import { useEffect } from "react";
import { CreateRole } from "@/schemas/role";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import type { UserPermissions } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Button,
  Text,
  TextInput,
  Textarea,
  Loader,
  MultiSelect,
} from "@mantine/core";

interface Props {
  className?: string;
  permissions: UserPermissions;
}

export function RoleForm({ className, permissions }: Props) {
  const { mutate, status, error } = api.role.create.useMutation();
  const router = useRouter();

  const selectablePermissions =
    permissions?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const form = useForm<CreateRole>({
    mode: "controlled",
    initialValues: {
      name: "",
      description: "",
      permissionIds: [],
    },

    validate: zodResolver(CreateRole),
  });

  const handleSubmit = (data: CreateRole) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Role has been added!",
        message: "Please refresh the page if you don't see the role.",
        withBorder: true,
      });

      router.push("/app/roles/manage");
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
        placeholder="Name of the role"
        size="md"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <MultiSelect
        required
        clearable
        searchable
        hidePickedOptions
        maxDropdownHeight={200}
        label="Role permissions"
        placeholder="Search or select permissions"
        size="md"
        data={selectablePermissions}
        key={form.key("permissionIds")}
        {...form.getInputProps("permissionIds")}
      />

      <Textarea
        label="Description"
        placeholder="Short description of the role"
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
            <Loader size={20} color="dark.9" mr="sm" /> Adding role...
          </>
        ) : (
          "Add role"
        )}
      </Button>
    </form>
  );
}
