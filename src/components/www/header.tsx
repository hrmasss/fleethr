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
import {
  IconNotification,
  IconCode,
  IconTimeline,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconRocket,
} from "@tabler/icons-react";
import classes from "@/components/styles/header.module.css";
import Logo from "@/components/images/logo";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "../theme-switch";
import Link from "next/link";
import { publicNavlinks as navlinks } from "@/lib/nav-data";

const features = [
  {
    icon: IconCode,
    title: "Open Source",
    description: "Built on open-source technologies.",
  },
  {
    icon: IconCoin,
    title: "Modular Pricing",
    description: "Choose and pay only for the modules you need.",
  },
  {
    icon: IconFingerprint,
    title: "Robust Security",
    description: "Industry-standard security measures.",
  },
  {
    icon: IconTimeline,
    title: "Advanced Analytics",
    description: "Powerful analytics tools for data-driven decision-making.",
  },
  {
    icon: IconNotification,
    title: "Intuitive User Interface",
    description: "Clean and user-friendly interface for enhanced productivity.",
  },
  {
    icon: IconRocket,
    title: "Easy Onboarding",
    description:
      "Streamlined onboarding process for a quick and hassle-free setup.",
  },
];

export function Header({ className }: { className?: string }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
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
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="hidden text-xl font-bold md:flex">fleethr</span>
          </Link>

          <Group h="100%" gap={0} visibleFrom="md" className="flex-nowrap">
            <Link href="/" className={classes.link}>
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
            <Link href={navlinks.pricing} className={classes.link}>
              Pricing
            </Link>
            <Link href={navlinks.contact} className={classes.link}>
              Contact us
            </Link>
          </Group>

          <Group visibleFrom="md">
            <ThemeSwitch />
            <Button variant="default" component={Link} href={navlinks.login}>
              Log in
            </Button>
            <Button component={Link} href={navlinks.singup}>
              Sign up
            </Button>
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
          <Divider my="sm" />

          <Stack gap="md">
            <Link href="/" className={classes.link} onClick={closeDrawer}>
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
              href={navlinks.pricing}
              className={classes.link}
              onClick={closeDrawer}
            >
              Pricing
            </Link>
            <Link
              href={navlinks.contact}
              className={classes.link}
              onClick={closeDrawer}
            >
              Contact us
            </Link>
            <span className={classes.link}>
              <ThemeSwitch variant="text" />
            </span>
          </Stack>

          <Divider my="sm" />

          <Group justify="center" grow p="md">
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
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
