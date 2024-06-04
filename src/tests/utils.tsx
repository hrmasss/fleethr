import userEvent from "@testing-library/user-event";
import type { ReactNode, ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { mantineTheme } from "@/lib/mantine-theme";

const theme = createTheme(mantineTheme);

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      {children}
    </MantineProvider>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
export { userEvent };
