"use client";

import { Transition, Button, type ButtonProps } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

interface BackButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function ScrollToTopButton({
  children,
  ...props
}: BackButtonProps) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Transition transition="slide-up" mounted={scroll.y > 0}>
      {(transitionStyles) => (
        <Button
          {...props}
          style={transitionStyles}
          onClick={() => scrollTo({ y: 0 })}
        >
          {children}
        </Button>
      )}
    </Transition>
  );
}
