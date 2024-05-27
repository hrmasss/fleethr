"use client";

import { api } from "@/trpc/react";
import { useEffect } from "react";
import { CreateLeaveApplication } from "@/schemas/leave-application";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { cn } from "@/lib/utils";
import Editor from "@/components/editor";
import {
  Button,
  Text,
  TextInput,
  TagsInput,
  Loader,
  Switch,
} from "@mantine/core";

interface Props {
  className?: string;
  employeeId: string;
}

export function LeaveForm({ className, employeeId }: Props) {
  const { mutate, status, error } = api.leave.create.useMutation();
  const router = useRouter();

  const form = useForm<CreateLeaveApplication>({
    mode: "controlled",
    initialValues: {
      employeeId: employeeId,
      startDate: new Date(),
      endDate: new Date(),
      leaveType: "",
      reason: "",
    },

    validate: zodResolver(CreateLeaveApplication),
  });

  const handleSubmit = (data: CreateLeaveApplication) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Application submitted successfully!",
        message: "Please refresh the page if you don't see the application.",
        withBorder: true,
      });

      router.push("/app/leave/apply");
    }
  }, [status, router]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <TextInput
        required
        label="Title"
        placeholder="Title of the notice"
        size="md"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <TagsInput
        label="Tags"
        placeholder="Notice tags"
        size="md"
        clearable
        key={form.key("tags")}
        {...form.getInputProps("tags")}
      />

      <Editor
        required
        label="Body"
        placeholder="Notice content"
        size="md"
        key={form.key("description")}
        {...form.getInputProps("description")}
      />

      <Switch
        styles={{
          track: { cursor: "pointer" },
          label: { cursor: "pointer" },
          body: {
            width: "fit-content",
          },
        }}
        size="md"
        label="Make public"
        key={form.key("isPublic")}
        {...form.getInputProps("isPublic")}
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
            <Loader size={20} color="dark.9" mr="sm" /> Publishing notice...
          </>
        ) : (
          "Publish notice"
        )}
      </Button>
    </form>
  );
}
