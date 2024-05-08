import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "@/styles/components/user-button.module.css";
import type { User } from "next-auth";

interface Props {
  user: User;
}

export function UserButton({ user }: Props) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar variant="light" src={user.image} radius="md" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.name ? user.name : user.email}
          </Text>

          <Text c="dimmed" size="xs">
            {user.name && user.email}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
