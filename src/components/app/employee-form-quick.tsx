"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import type { Departments } from "@/lib/types";
import { CreateEmployee } from "@/schemas/employee";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import {
  Button,
  Text,
  TextInput,
  Loader,
  Select,
} from "@mantine/core";

interface Props {
  className?: string;
  departments: Departments;
}

export function EmployeeFormQuick({ className, departments }: Props) {
  const { mutate, status, error } = api.employee.create.useMutation();

  const selectableDepartments =
    departments?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const form = useForm<CreateEmployee>({
    mode: "controlled",
    initialValues: {
      employeeId: "",
      departmentId: "",
      email: "",
      jobTitle: "",
    },

    validate: zodResolver(CreateEmployee),
  });

  const handleSubmit = (data: CreateEmployee) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Employee has been added!",
        message: "Please refresh the page if you don't see the record.",
        withBorder: true,
      });

      form.reset();
    }
  }, [status]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <TextInput
          required
          label="Employee Id"
          placeholder="Employee Id"
          size="md"
          key={form.key("employeeId")}
          {...form.getInputProps("employeeId")}
        />

        <Select
          required
          searchable
          size="md"
          label="Employee department"
          placeholder="Search or select department"
          nothingFoundMessage={
            <div className="p-4">
              <Text>No department was found</Text>
              <Button
                mt="sm"
                size="sm"
                variant="outline"
                component={Link}
                href="/app/departments/manage"
              >
                Manage departments
              </Button>
            </div>
          }
          data={selectableDepartments}
          key={form.key("departmentId")}
          {...form.getInputProps("departmentId")}
        />
      </div>

      <TextInput
        required
        label="Job title"
        placeholder="Job title of the employee"
        size="md"
        key={form.key("jobTitle")}
        {...form.getInputProps("jobTitle")}
      />

      <TextInput
        label="Employee email"
        placeholder="user@provider.com"
        type="email"
        size="md"
        required
        key={form.key("email")}
        {...form.getInputProps("email")}
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
            <Loader size={20} color="dark.9" mr="sm" />
            Adding employee...
          </>
        ) : (
          "Add employee"
        )}
      </Button>
    </form>
  );
}
