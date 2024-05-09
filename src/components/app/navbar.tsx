"use client";

import type { User } from "next-auth";
import { Group, ScrollArea } from "@mantine/core";
import { UserButton } from "@/components/app/user-button";
import { LinksGroup } from "@/components/app/links-group";
import Logo from "@/components/images/logo";
import classes from "@/styles/components/navbar.module.css";
import Link from "next/link";
import { appLinks } from "@/lib/nav-data";
import { ThemeSwitch } from "@/components/theme-switch";

export function Navbar({ user }: { user: User }) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-6" />
            <span className="hidden text-xl font-bold md:flex">fleethr</span>
          </Link>
          <ThemeSwitch />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {appLinks.map((item) => (
            <LinksGroup {...item} key={item.label} />
          ))}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton user={user} />
      </div>
    </nav>
  );
}
