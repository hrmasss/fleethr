"use client";

import { cn } from "@/lib/utils";
import classes from "@/styles/components/theme-switch.module.css";
import { IconSun, IconMoon } from "@tabler/icons-react";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import cx from "clsx";

interface Props {
  className?: string;
  variant?: "icon" | "text";
}

export function ThemeSwitch({ className, variant }: Props) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const changeTheme = () =>
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");

  const getThemeText = () =>
    computedColorScheme === "light" ? "Dark theme" : "Light theme";

  switch (variant) {
    case "text":
      return (
        <span className={cn("capitalize", className)} onClick={changeTheme}>
          {getThemeText()}
        </span>
      );
    default:
      return (
        <ActionIcon
          onClick={changeTheme}
          variant="subtle"
          radius="xl"
          size="lg"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
      );
  }
}
