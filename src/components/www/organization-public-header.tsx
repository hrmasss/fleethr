"use client";

import type { OrganizationPublicInfo } from "@/lib/types";
import { publicLinks as navlinks } from "@/lib/nav-data";
import classes from "@/styles/components/header.module.css";
import { ThemeSwitch } from "@/components/theme-switch";
import { IconX } from "@tabler/icons-react";
import { Group, Box } from "@mantine/core";
import Logo from "@/components/images/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  organization: OrganizationPublicInfo;
}

export function Header({ className, organization }: Props) {
  return (
    <Box>
      <header className={cn(classes.header, className)}>
        <Group justify="space-between" h="100%">
          <Link href={navlinks.www} className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="hidden text-xl font-bold md:flex">fleethr</span>
            <IconX size={20} />
            <span className="text-xl font-bold">{organization.name}</span>
          </Link>

          <ThemeSwitch />
        </Group>
      </header>
    </Box>
  );
}
