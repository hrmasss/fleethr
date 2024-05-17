"use client";

import { AppShell, Box } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  navbar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export function AppLayout({ navbar, header, children }: Props) {
  return (
    <AppShell navbar={{ width: 300, breakpoint: "md" }}>
      <AppShell.Navbar visibleFrom="md">{navbar}</AppShell.Navbar>
      <AppShell.Main>
        <Box hiddenFrom="md" pos="sticky" top={0} style={{ zIndex: 100 }}>
          {header}
        </Box>
        <Box p={{ base: "sm", sm: "lg", md: "xl" }}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
