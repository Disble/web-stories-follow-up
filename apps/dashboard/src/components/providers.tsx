"use client";

import { NextUIProvider } from "@repo/ui/nextui";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push} locale="es-ES">
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
