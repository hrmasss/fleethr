import { api } from "@/trpc/server";
import { IconArrowRight } from "@tabler/icons-react";
import { Button, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { NoticeCard } from "@/components/app/notice-card";

export default async function Page() {
  const organization = await api.organization.get();
  const notices = await api.notice.getAllInternal();

  return (
    <main>
      <div>
        <h3 className="my-2 text-xl font-bold md:text-3xl">
          Internal notice board
        </h3>

        <p className="max-w-xl">
          Here you can find notices that are only visible to the members of your
          organization. Looking for publicly available notices?
        </p>

        <Button
          rightSection={<IconArrowRight size={20} />}
          variant="outline"
          component={Link}
          href={`/org/${organization?.slug}/notice`}
          className="mt-4"
        >
          Visit public notice board
        </Button>
      </div>

      <Paper mt="xl" radius="md" className="space-y-4">
        {notices.length !== 0 ? (
          notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              href={`/app/notice/internal/${notice.id}`}
            />
          ))
        ) : (
          <Text c="dimmed" fw="bold">
            No notices to display
          </Text>
        )}
      </Paper>
    </main>
  );
}
