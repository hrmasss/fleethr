import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Notice from "@/components/notice";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Container, Affix, Button, rem } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import ScrollToTopButton from "@/components/scroll-top-button";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const organization = await api.organization.getPublicInfo({
    slug: params.slug,
  });

  if (!organization) notFound();

  const notice = await api.notice.getPublic({
    orgId: organization.id,
    noticeId: params.id,
  });

  if (!notice) notFound();

  return (
    <main>
      <Container size="lg">
        <Button
          component={Link}
          href={`/org/${organization.slug}/notice`}
          leftSection={<IconArrowLeft size={20} />}
          variant="subtle"
        >
          Back to all notices
        </Button>

        <Notice notice={notice} />
      </Container>

      <Affix position={{ bottom: 20, right: 20 }} visibleFrom="sm">
        <ScrollToTopButton
          radius="xl"
          variant="light"
          leftSection={
            <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
          }
        >
          Scroll to top
        </ScrollToTopButton>
      </Affix>
    </main>
  );
}
