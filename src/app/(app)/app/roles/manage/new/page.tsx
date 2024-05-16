import { RoleForm } from "@/components/app/role-form";
import { Card } from "@mantine/core";
import { api } from "@/trpc/server";

export default async function Page() {
  const permissions = await api.user.getPermissions();

  return (
    <main>
      <h3 className="mb-4 mt-2 text-xl font-bold md:text-3xl">
        Add a new role
      </h3>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <RoleForm permissions={permissions} />
      </Card>
    </main>
  );
}
