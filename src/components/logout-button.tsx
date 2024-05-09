"use client";

import type { MouseEvent } from "react";
import { type ButtonProps, Button } from "@mantine/core";
import { signOut } from "next-auth/react";

interface LogoutButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function LogoutButton({
  children,
  onClick,
  ...props
}: LogoutButtonProps) {
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await signOut({ callbackUrl: "/" });
    onClick?.(event);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
