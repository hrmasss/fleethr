import { api } from "@/trpc/server";
import { IconPlus } from "@tabler/icons-react";
import { Button, Card } from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const departments = await api.department.getAll();

  return (
    <main>
      <div>
        <h3 className="my-2 text-xl font-bold md:text-3xl">
          Department Management
        </h3>

        <p className="max-w-xl">
          Here you can find & Manage all departments from your organization.
        </p>

        <Button
          leftSection={<IconPlus size={20} />}
          variant="outline"
          component={Link}
          href="/app/department/manage/new"
          className="mt-4"
        >
          New Department
        </Button>
      </div>

      <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
        All departments
      </Card>
    </main>
  );
}
