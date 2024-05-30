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
import { DatePickerInput } from "@mantine/dates";
import { Button, Text, Select, Loader } from "@mantine/core";

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
      <Select
        required
        searchable
        label="Leave type"
        placeholder="Select or search leave type"
        size="md"
        data={[
          "Sick Leave",
          "Annual Leave",
          "Maternity Leave",
          "Paternity Leave",
          "Casual Leave",
          "Compensatory Leave",
          "Study Leave",
          "Medical Leave",
          "Unpaid Leave",
          "Vacation Leave",
          "Personal Leave",
          "Family Care Leave",
          "Disability Leave",
          "Hajj/Pilgrimage Leave",
          "Marriage Leave",
        ]}
        key={form.key("leaveType")}
        {...form.getInputProps("leaveType")}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DatePickerInput
          required
          size="md"
          label="Start date"
          placeholder="Select starting date"
          key={form.key("startDate")}
          {...form.getInputProps("startDate")}
        />

        <DatePickerInput
          required
          size="md"
          label="End date"
          placeholder="Select ending date"
          key={form.key("endDate")}
          {...form.getInputProps("endDate")}
        />
      </div>

      <Editor
        required
        label="Body"
        placeholder="Notice content"
        size="md"
        key={form.key("reason")}
        {...form.getInputProps("reason")}
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
            <Loader size={20} color="dark.9" mr="sm" /> Submitting...
          </>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
}
