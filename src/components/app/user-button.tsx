import type { User } from "next-auth";
import classes from "@/styles/components/user-button.module.css";
import { Menu, UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconLogout, IconUser, IconChevronRight } from "@tabler/icons-react";
import LogoutButton from "@/components/logout-button";

interface Props {
  user: User;
}

export function UserButton({ user }: Props) {
  return (
    <Menu shadow="md" width={290}>
      <Menu.Target>
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
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        
        <Menu.Item
          component={LogoutButton}
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
