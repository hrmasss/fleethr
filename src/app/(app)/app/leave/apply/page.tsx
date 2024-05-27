import { LeaveForm } from "@/components/app/leave-form";
import { Card } from "@mantine/core";

export default function Page() {
  return (
    <main>
      <h3 className="mb-4 mt-2 text-xl font-bold md:text-3xl">
        Apply for leave
      </h3>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LeaveForm employeeId="xxx"/>
      </Card>
    </main>
  );
}
