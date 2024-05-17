import { api } from "@/trpc/server";
import { IconPlus, IconBolt } from "@tabler/icons-react";
import { Button, Card, Group } from "@mantine/core";
import RoleDataTable from "@/components/app/role-data-table";
import Link from "next/link";

export default async function Page() {
  const roles = await api.role.getAll();

  return (
    <main>
      <div>
        <h3 className="my-2 text-xl font-bold md:text-3xl">
          Employee Management
        </h3>

        <p className="max-w-xl">
          Here you can manage employee informations and actions.
        </p>

        <Group className="mt-4">
          <Button
            leftSection={<IconPlus size={20} />}
            variant="outline"
            component={Link}
            href="/app/employees/manage/new"
          >
            New Employee
          </Button>

          <Button
            leftSection={<IconBolt size={20} />}
            variant="gradient"
            component={Link}
            href="/app/employees/manage/new"
          >
            Quick Add
          </Button>
        </Group>
      </div>

      <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
        <RoleDataTable roles={roles} />
      </Card>
    </main>
  );
}
