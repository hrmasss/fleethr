import { type Notices } from "@/lib/types";
import { Card, Text, Badge } from "@mantine/core";
import Link from "next/link";

interface Props {
  notice: Notices[0];
}

export function NoticeCard({ notice }: Props) {
  return (
    <Card
      component={Link}
      href={`/app/notice/internal/${notice.id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <div>
        <Text c="dimmed" fw={700} size="xs">
          {notice.createdAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Text my="xs" fw={500}>
          {notice.title}
        </Text>

        {notice.tags.length !== 0 && (
          <div className="flex flex-wrap gap-2">
            {notice.tags.map((tag, idx) => (
              <Badge variant="light" key={idx} className="cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
