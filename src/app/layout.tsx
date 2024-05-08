import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { mantineTheme } from "@/lib/mantine-theme";

const theme = createTheme(mantineTheme);

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FleetHR",
  description: "A Modular Human Resource Management SAAS",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`font-sans ${sora.variable}`}>
        <TRPCReactProvider>
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            {children}
            <Notifications />
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
