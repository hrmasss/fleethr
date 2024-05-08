"use client";

import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "@/components/styles/footer.module.css";
import Logo from "@/components/images/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { publicNavlinks as navlinks, socials } from "@/lib/nav-data";

const links = [
  { link: navlinks.contact, label: "Contact" },
  { link: navlinks.privacy, label: "Privacy" },
  { link: navlinks.blog, label: "Blog" },
  { link: navlinks.features, label: "Features" },
];

export function Footer({ className }: { className?: string }) {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={cn(classes.footer, className)}>
      <div className={classes.inner}>
        <a href="/" className="flex items-center gap-2">
          <Logo className="size-6" />
          <span className="text-xl font-bold">fleethr</span>
        </a>

        <Group justify="center" className={classes.links}>
          {items}
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component={Link}
            href={socials.facebook}
          >
            <IconBrandFacebook
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component={Link}
            href={socials.twitter}
          >
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component={Link}
            href={socials.instagram}
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
