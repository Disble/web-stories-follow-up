"use client";

import { NextUIProvider } from "@repo/ui/nextui";

export default function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </>
  );
}
