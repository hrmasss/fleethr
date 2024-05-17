"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import type { Departments } from "@/lib/types";
import { CreateEmployee } from "@/schemas/employee";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import { useUploadThing } from "@/components/uploadthing";
import { applicationStatus } from "@/lib/data";
import { IconFileText } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  Button,
  Text,
  TextInput,
  Textarea,
  Loader,
  Select,
  FileInput,
} from "@mantine/core";

interface Props {
  className?: string;
  departments: Departments;
}

export function EmployeeForm({ className, departments }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, status, error } = api.employee.create.useMutation();
  const { startUpload, isUploading } = useUploadThing("pdfUploader");
  const router = useRouter();

  const selectableDepartments =
    departments?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const form = useForm<CreateEmployee>({
    mode: "controlled",
    initialValues: {
      name: "",
      employeeId: "",
      departmentId: "",
      email: "",
      jobTitle: "",
      idVerificationDoc: "",
      idVerificationStatus: "",
      permanentAddress: "",
      presentAddress: "",
      phone: "",
    },

    validate: zodResolver(CreateEmployee),
  });

  const handleSubmit = (data: CreateEmployee) => {
    const uploadFileAndSubmit = async (file: File) => {
      try {
        const res = await startUpload([file]);
        if (!res?.[0]) throw new Error("File could not be uploaded");

        mutate({ ...data, idVerificationDoc: res[0].url });
      } catch (error) {
        form.setErrors({ idVerificationDoc: "File could not be uploaded" });
      }
    };

    if (file)
      uploadFileAndSubmit(file).catch((error) => {
        console.error(error);
        form.setErrors({ idVerificationDoc: "File could not be uploaded" });
      });
    else mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      notifications.show({
        title: "Employee has been added!",
        message: "Please refresh the page if you don't see the record.",
        withBorder: true,
      });

      router.push("/app/employees/manage");
    }
  }, [status, router]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <TextInput
        label="Name"
        placeholder="Name of the employee"
        size="md"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

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

      <div className="grid gap-6 md:grid-cols-2">
        <TextInput
          label="Employee email"
          placeholder="user@provider.com"
          type="email"
          size="md"
          required
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <TextInput
          label="Phone"
          placeholder="Phone no of the employee"
          size="md"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Textarea
          label="Present Address"
          placeholder="Current address of the employee"
          size="md"
          autosize
          minRows={2}
          maxRows={5}
          key={form.key("presentAddress")}
          {...form.getInputProps("presentAddress")}
        />

        <Textarea
          label="Permanent Address"
          placeholder="Permanent address of the employee"
          size="md"
          autosize
          minRows={2}
          maxRows={5}
          key={form.key("permanentAddress")}
          {...form.getInputProps("permanentAddress")}
        />
      </div>

      <Select
        size="md"
        label="Identity verification status"
        placeholder="Select status"
        data={applicationStatus}
        key={form.key("idVerificationStatus")}
        {...form.getInputProps("idVerificationStatus")}
      />

      <FileInput
        clearable
        size="md"
        accept=".pdf"
        leftSection={<IconFileText stroke={1.5} />}
        leftSectionPointerEvents="none"
        label="Upload verification document"
        placeholder="Verification document"
        description="Compose all documents in one PDF and upload it here"
        value={file}
        onChange={setFile}
        error={form.errors.idVerificationDoc}
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
        disabled={status === "pending" || isUploading}
      >
        {status === "pending" || isUploading ? (
          <>
            <Loader size={20} color="dark.9" mr="sm" />{" "}
            {isUploading ? "Uploading document..." : "Adding employee..."}
          </>
        ) : (
          "Add employee"
        )}
      </Button>
    </form>
  );
}
