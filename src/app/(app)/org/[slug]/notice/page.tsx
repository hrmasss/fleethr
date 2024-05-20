import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Paper, Text, Container } from "@mantine/core";
import { NoticeCard } from "@/components/app/notice-card";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const organization = await api.organization.getPublicInfo({
    slug: params.slug,
  });
  if (!organization) notFound();

  const notices = await api.notice.getAllPublic({ orgId: organization.id });

  return (
    <main>
      <Container size="lg">
        <div>
          <h3 className="my-2 text-xl font-bold md:text-3xl">
            {organization.name} notice board
          </h3>

          <p className="max-w-xl">
            Public notices & announcements by {organization.name}
          </p>
        </div>

        <Paper mt="xl" radius="md" className="my-4 space-y-4">
          {notices.length !== 0 ? (
            notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                href={`/org/${organization.slug}/notice/${notice.id}`}
              />
            ))
          ) : (
            <Text c="dimmed" fw="bold">
              No notices to display
            </Text>
          )}
        </Paper>
      </Container>
    </main>
  );
}
