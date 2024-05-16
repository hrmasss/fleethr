import { DepartmentForm } from "@/components/app/department-form";
import { Card } from "@mantine/core";

export default function Page() {
  return (
    <main>
      <h3 className="mb-4 mt-2 text-xl font-bold md:text-3xl">
        Add a new department
      </h3>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <DepartmentForm />
      </Card>
    </main>
  );
}
