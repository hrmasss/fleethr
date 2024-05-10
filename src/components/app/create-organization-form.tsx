"use client";

import { api } from "@/trpc/react";
import { CreateOrganization } from "@/schemas/organization";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  Loader,
  Textarea,
  Slider,
  Input,
} from "@mantine/core";
import { cn } from "@/lib/utils";

interface Props {
  onSuccess?: () => void;
  className?: string;
}

export function CreateOrganizationForm({ onSuccess, className }: Props) {
  const { mutate, status, error } = api.organization.create.useMutation();

  const form = useForm<CreateOrganization>({
    mode: "controlled",
    initialValues: {
      name: "",
      description: "",
      maxSize: 20,
    },

    validate: zodResolver(CreateOrganization),
  });

  const handleSubmit = (data: CreateOrganization) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success" && onSuccess) onSuccess();
  }, [status, onSuccess]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <TextInput
        required
        label="Organization name"
        placeholder="Name of your organization"
        size="md"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Input.Wrapper
        required
        label="Organization members"
        description="The number of members affects the pricing plan for your organization"
        size="md"
        error={form.errors.maxSize}
      >
        <Slider
          mt="md"
          mb="xl"
          thumbSize={25}
          step={5}
          min={5}
          max={500}
          key={form.key("maxSize")}
          {...form.getInputProps("maxSize")}
          marks={[
            { value: 20, label: "20" },
            { value: 100, label: "100" },
            { value: 250, label: "250" },
            { value: 500, label: "500" },
          ]}
        />
      </Input.Wrapper>

      <Textarea
        label="Description"
        placeholder="Write a short description about your organization"
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
            <Loader size={20} color="dark.9" mr="sm" /> Adding organization...
          </>
        ) : (
          "Add organization"
        )}
      </Button>
    </form>
  );
}
