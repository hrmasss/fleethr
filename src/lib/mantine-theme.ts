import { type MantineThemeOverride, DEFAULT_THEME } from "@mantine/core";
import { sora } from "@/app/layout";

export const mantineTheme: MantineThemeOverride = {
  primaryShade: { light: 5, dark: 6 },
  primaryColor: "teal",
  autoContrast: true,
  defaultGradient: {
    from: "teal",
    to: "lime",
    deg: 45,
  },
  fontFamily: `${sora.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
};
