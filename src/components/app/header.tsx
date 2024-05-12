"use client";

import type { User } from "next-auth";
import { Group, Divider, Box, Burger, Drawer, ScrollArea } from "@mantine/core";
import classes from "@/styles/components/header.module.css";
import { useDisclosure } from "@mantine/hooks";
import Logo from "@/components/images/logo";
import { ThemeSwitch } from "@/components/theme-switch";
import { LinksGroup } from "@/components/app/links-group";
import { UserButton } from "@/components/app/user-button";
import { appLinks } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header({
  className,
  user,
}: {
  className?: string;
  user: User;
}) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={cn(classes.header, className)}>
        <Group justify="space-between" h="100%">
          <Link href="/app" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="hidden text-xl font-bold md:flex">fleethr</span>
          </Link>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<ThemeSwitch />}
        closeButtonProps={{ size: "lg" }}
        scrollAreaComponent={ScrollArea.Autosize}
        hiddenFrom="md"
        zIndex={100}
      >
        <Box mx="-md">
          <Divider />
          <UserButton user={user} />
          <Divider mb="sm" />

          {appLinks.map((item) => (
            <LinksGroup
              {...item}
              key={item.label}
              onLinkClicked={closeDrawer}
            />
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
