"use client";

import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import classes from "@/styles/components/links-group.module.css";

interface LinksGroupProps {
  icon: typeof IconChevronRight;
  label: string;
  href?: string;
  initiallyOpened?: boolean;
  links?: { label: string; href: string }[];
  onLinkClicked?: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  href,
  initiallyOpened,
  links,
  onLinkClicked,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened ?? false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      className={classes.link}
      href={link.href}
      key={link.label}
      onClick={onLinkClicked}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      {href ? (
        <UnstyledButton
          component={Link}
          href={href}
          onClick={onLinkClicked}
          className={classes.control}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </UnstyledButton>
      ) : (
        <>
          <UnstyledButton
            onClick={() => setOpened((o) => !o)}
            className={classes.control}
          >
            <Group justify="space-between" gap={0}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon style={{ width: rem(18), height: rem(18) }} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              {links && (
                <IconChevronRight
                  className={classes.chevron}
                  stroke={1.5}
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transform: opened ? "rotate(-90deg)" : "none",
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
          {links && <Collapse in={opened}>{items}</Collapse>}
        </>
      )}
    </>
  );
}
