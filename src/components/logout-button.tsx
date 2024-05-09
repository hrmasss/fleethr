"use client";

import type { MouseEvent } from "react";
import { type ButtonProps, Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function LogoutButton({
  children,
  onClick,
  ...props
}: LogoutButtonProps) {
  const router = useRouter();

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.refresh();
    onClick?.(event);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
