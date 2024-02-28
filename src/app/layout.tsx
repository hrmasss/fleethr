import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Sora } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { AuthSessionProvider } from "@/components/session-provider";
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
      <body className={`font-sans ${sora.variable}`}>
        <TRPCReactProvider>
          <AuthSessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
