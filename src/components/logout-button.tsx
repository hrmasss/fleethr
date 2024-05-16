"use client";

import { type UnstyledButtonProps, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type { MouseEvent } from "react";
interface LogoutButtonProps extends UnstyledButtonProps {
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
    const res = await signOut({
      redirect: false,
      callbackUrl: "/",
    });

    router.refresh();
    router.push(res.url);
    onClick?.(event);
  };

  return (
    <UnstyledButton {...props} onClick={handleClick}>
      {children}
    </UnstyledButton>
  );
}
