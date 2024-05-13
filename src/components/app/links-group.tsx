"use client";

import type { AppLink } from "@/lib/nav-data";
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

interface LinksGroupProps extends AppLink {
  initiallyOpened?: boolean;
  onLinkClicked?: () => void;
  permittedRoutes: string[];
}

export function LinksGroup({
  icon: Icon,
  label,
  href,
  initiallyOpened,
  links,
  onLinkClicked,
  permittedRoutes,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened ?? false);

  const isPermitted = !href || permittedRoutes.some((route) => route === href);

  const permittedLinks = links?.filter((link) =>
    permittedRoutes?.some((route) => route === link.href),
  );

  if (!isPermitted && (!links || permittedLinks?.length === 0)) {
    return null; // Don't render the component if no permissions match
  }

  const items = (hasLinks ? permittedLinks : [])?.map((link) => (
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
          {items?.length !== 0 && (
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
      )}
    </>
  );
}
