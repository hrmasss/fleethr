import type { Notices } from "@/lib/types";
import {
  TypographyStylesProvider,
  Paper,
  Title,
  Card,
  Box,
  Text,
  Badge,
} from "@mantine/core";

interface Props {
  notice: Notices[0];
}

export default function Notice({ notice }: Props) {
  return (
    <Paper>
      <Card
        p={{
          base: "lg",
          sm: "xl",
        }}
        my="lg"
        radius="md"
        bg="teal.1"
        withBorder
        shadow="sm"
      >
        <Text c="gray.7" fw={700}>
          Published on{" "}
          {notice.createdAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>

        <Title c="gray.9" my="md">
          {notice.title}
        </Title>

        {notice.tags.length !== 0 && (
          <div className="flex flex-wrap gap-2">
            {notice.tags.map((tag, idx) => (
              <Badge
                color="gray.7"
                variant="outline"
                key={idx}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <Box
        p={{
          base: "sm",
          sm: "xl",
        }}
      >
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: notice.description }} />
        </TypographyStylesProvider>
      </Box>
    </Paper>
  );
}
