import type { MantineThemeOverride } from "@mantine/core";

export const mantineTheme: MantineThemeOverride = {
  primaryShade: { light: 4, dark: 6 },
  primaryColor: "teal",
  autoContrast: true,
  defaultGradient: {
    from: "teal",
    to: "lime",
    deg: 45,
  },
};