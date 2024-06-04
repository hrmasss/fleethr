import { LeaveForm } from "@/components/app/leave-form";
import { IconInfoCircle } from "@tabler/icons-react";
import { Card, Alert } from "@mantine/core";
import { api } from "@/trpc/server";

export default async function Page() {
  const employee = await api.employee.getSelf();

  return (
    <main className="size-full">
      {employee ? (
        <>
          <h1 className="mb-4 mt-2 text-xl font-bold md:text-3xl">
            Apply for leave
          </h1>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <LeaveForm employeeId={employee.id} />
          </Card>
        </>
      ) : (
        <Card
          shadow="sm"
          padding="none"
          radius="md"
          withBorder
          className="max-w-3xl m-auto"
        >
          <Alert
            variant="light"
            color="red"
            radius="md"
            title="No associated employee record"
            icon={<IconInfoCircle />}
          >
            Please log in with an employee account in order to apply for leave.
          </Alert>
        </Card>
      )}
    </main>
  );
}
