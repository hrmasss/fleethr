"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  variant?: "icon" | "text" | "combo";
}

export function ThemeSwitch({ className, variant }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const changeTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  switch (variant) {
    case "text":
      return (
        <span className={cn("capitalize", className)} onClick={changeTheme}>
          <span className="hidden dark:flex">Dark Mode</span>
          <span className="dark:hidden">Light Mode</span>
        </span>
      );

    case "combo":
      return (
        <span
          onClick={changeTheme}
          className={cn(
            "flex size-full cursor-pointer items-center gap-2",
            className,
          )}
        >
          <span>
            <SunIcon className="size-4 dark:hidden" />
            <MoonIcon className="hidden size-4 dark:block" />
            <span className="sr-only">Switch theme</span>
          </span>
          <span>
            <span className="hidden dark:flex">Dark Mode</span>
            <span className="dark:hidden">Light Mode</span>
          </span>
        </span>
      );

    default:
      return (
        <Button
          onClick={changeTheme}
          className={cn("rounded-full", className)}
          variant="outline"
          size="icon"
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Switch theme</span>
        </Button>
      );
  }
}
