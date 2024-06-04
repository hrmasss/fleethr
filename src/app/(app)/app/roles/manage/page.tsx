import { api } from "@/trpc/server";
import { IconPlus } from "@tabler/icons-react";
import { Button, Card } from "@mantine/core";
import RoleDataTable from "@/components/app/role-data-table";
import Link from "next/link";

export default async function Page() {
  const roles = await api.role.getAll();

  return (
    <main>
      <div>
        <h1 className="my-2 text-xl font-bold md:text-3xl">Role Management</h1>

        <p className="max-w-xl">
          Here you can find & Manage all roles & their permissions from your
          organization.
        </p>

        <Button
          leftSection={<IconPlus size={20} />}
          variant="outline"
          component={Link}
          href="/app/roles/manage/new"
          className="mt-4"
        >
          New Role
        </Button>
      </div>

      <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
        <RoleDataTable roles={roles} />
      </Card>
    </main>
  );
}
