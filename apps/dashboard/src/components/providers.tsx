"use client";

import { NextUIProvider } from "@repo/ui/nextui";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: { children: React.ReactNode }): JSX.Element {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
