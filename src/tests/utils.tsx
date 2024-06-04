import userEvent from "@testing-library/user-event";
import type { ReactNode, ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
export { userEvent };
