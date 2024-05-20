import { api } from "@/trpc/server";
import BackButton from "@/components/back-button";
import { Card } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { EmployeeFormQuick } from "@/components/app/employee-form-quick";

export default async function Page() {
  const departments = await api.department.getAll();

  return (
    <main>
      <div className="mb-8">
        <BackButton
          leftSection={<IconArrowLeft size={20} />}
          variant="subtle"
          mb="sm"
        >
          Get back
        </BackButton>

        <h3 className="mt-2 text-xl font-bold md:text-3xl">
          Add a new employee
        </h3>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <EmployeeFormQuick departments={departments} />
      </Card>
    </main>
  );
}
