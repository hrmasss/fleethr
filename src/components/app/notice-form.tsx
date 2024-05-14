"use client";

import { api } from "@/trpc/react";
import { useEffect } from "react";
import { CreateNotice } from "@/schemas/notice";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { cn } from "@/lib/utils";
import {
  Button,
  Text,
  TextInput,
  TagsInput,
  Loader,
  Textarea,
  Switch,
} from "@mantine/core";

interface Props {
  className?: string;
}

export function NoticeForm({ className }: Props) {
  const { mutate, status, error } = api.notice.create.useMutation();
  const router = useRouter();

  const form = useForm<CreateNotice>({
    mode: "controlled",
    initialValues: {
      title: "",
      description: "",
      tags: [],
      isPublic: false,
    },

    validate: zodResolver(CreateNotice),
  });

  const handleSubmit = (data: CreateNotice) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Notice has been published!",
        message: "Please refresh the page if you don't see the notice.",
        withBorder: true,
      });

      router.back();
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
        placeholder="Enter tags for the notice"
        size="md"
        clearable
        key={form.key("tags")}
        {...form.getInputProps("tags")}
      />

      <Textarea
        required
        label="Description"
        placeholder="Write a short description about your organization"
        size="md"
        autosize
        minRows={3}
        maxRows={5}
        key={form.key("description")}
        {...form.getInputProps("description")}
      />

      <Switch
        styles={{ input: { cursor: "pointer" }, label: { cursor: "pointer" } }}
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
