"use client";

import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "@/styles/components/footer.module.css";
import Logo from "@/components/images/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { publicLinks as navlinks, socials } from "@/lib/nav-data";

const links = [
  { href: navlinks.contact, label: "Contact" },
  { href: navlinks.privacy, label: "Privacy" },
  { href: navlinks.blog, label: "Blog" },
  { href: navlinks.features, label: "Features" },
];

export function Footer({ className }: { className?: string }) {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.href}
      lh={1}
      component={Link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={cn(classes.footer, className)}>
      <div className={cn(classes.inner, "gap-4")}>
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
