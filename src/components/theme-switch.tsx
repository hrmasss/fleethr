"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface Props {
    className?: string;
    variant?: "icon" | "text";
}

export function ThemeSwitch({ className, variant }: Props) {
    const { resolvedTheme, setTheme } = useTheme();

    const changeTheme = () => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <>
            {variant === "text" ? (
                <span
                    className={cn("capitalize", className)}
                    onClick={changeTheme}>
                    {resolvedTheme} Mode
                </span>
            ) : (
                <Button
                    onClick={changeTheme}
                    className={cn("rounded-full", className)}
                    variant="outline"
                    size="icon">
                    <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Switch theme</span>
                </Button>
            )}
        </>
    );
}
