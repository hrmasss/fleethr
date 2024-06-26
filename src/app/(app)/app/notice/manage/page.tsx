import { api } from "@/trpc/server";
import NoticeDataTable from "@/components/app/notice-data-table";
import { IconPlus } from "@tabler/icons-react";
import { Button, Card } from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const notices = await api.notice.getAll();

  return (
    <main>
      <div>
        <h1 className="my-2 text-xl font-bold md:text-3xl">
          Notice Management
        </h1>

        <p className="max-w-xl">
          Publish & Manage company notices and announcements. You can manage
          both internal and public notice board from here.
        </p>

        <Button
          leftSection={<IconPlus size={20} />}
          variant="outline"
          component={Link}
          href="/app/notice/manage/new"
          className="mt-4"
        >
          New notice
        </Button>
      </div>

      <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
        <NoticeDataTable notices={notices} />
      </Card>
    </main>
  );
}
