"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "@/styles/components/header.module.css";
import Logo from "@/components/images/logo";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import { publicLinks as navlinks } from "@/lib/nav-data";
import { features } from "@/lib/data";
import LogoutButton from "@/components/logout-button";
import { useSession } from "next-auth/react";

export function Header({ className }: { className?: string }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { status } = useSession();
  const theme = useMantineTheme();

  const links = features.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.primaryColor}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <header className={cn(classes.header, className)}>
        <Group justify="space-between" h="100%">
          <Link href={navlinks.www} className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="hidden text-xl font-bold md:flex">fleethr</span>
          </Link>

          <Group h="100%" gap={0} visibleFrom="md" className="flex-nowrap">
            <Link href={navlinks.www} className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link href={navlinks.features} className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor component={Link} href={navlinks.features} fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Flexible HR management, tailored to you.
                      </Text>
                    </div>
                    <Button
                      variant="default"
                      component={Link}
                      href={navlinks.singup}
                    >
                      Get started
                    </Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href={navlinks.contact} className={classes.link}>
              Contact us
            </Link>
            <Link href={navlinks.faq} className={classes.link}>
              FAQ
            </Link>
          </Group>

          <Group visibleFrom="md">
            <ThemeSwitch />
            {status === "authenticated" ? (
              <>
                <Button component={LogoutButton} variant="default">
                  Log out
                </Button>
                <Button component={Link} href={navlinks.dashboard}>
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  component={Link}
                  href={navlinks.login}
                >
                  Log in
                </Button>
                <Button component={Link} href={navlinks.singup}>
                  Sign up
                </Button>
              </>
            )}
          </Group>

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
        title="Menu"
        hiddenFrom="md"
        zIndex={100}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider mb="sm" />

          <Stack gap="md">
            <Link
              href={navlinks.www}
              className={classes.link}
              onClick={closeDrawer}
            >
              Home
            </Link>
            <UnstyledButton
              className={cn(classes.link, "w-full")}
              onClick={toggleLinks}
            >
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <Link
              href={navlinks.contact}
              className={classes.link}
              onClick={closeDrawer}
            >
              Contact us
            </Link>
            <Link
              href={navlinks.faq}
              className={classes.link}
              onClick={closeDrawer}
            >
              FAQ
            </Link>
            <span className={classes.link}>
              <ThemeSwitch variant="text" />
            </span>
          </Stack>

          <Divider my="sm" />

          <Group justify="center" grow p="md">
            {status === "authenticated" ? (
              <>
                <Button
                  component={LogoutButton}
                  variant="default"
                  onClick={closeDrawer}
                >
                  Log out
                </Button>
                <Button
                  component={Link}
                  href={navlinks.dashboard}
                  onClick={closeDrawer}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  component={Link}
                  href={navlinks.login}
                  onClick={closeDrawer}
                >
                  Log in
                </Button>
                <Button
                  component={Link}
                  href={navlinks.singup}
                  onClick={closeDrawer}
                >
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
