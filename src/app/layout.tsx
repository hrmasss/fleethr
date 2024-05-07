import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const sora = Sora({
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
          <MantineProvider defaultColorScheme="auto">
            {children}
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
