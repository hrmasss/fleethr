"use client";

import { Button, type ButtonProps } from "@mantine/core";
import { useRouter } from "next/navigation";

interface BackButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function BackButton({ children, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button {...props} onClick={() => router.back()}>
      {children}
    </Button>
  );
}
