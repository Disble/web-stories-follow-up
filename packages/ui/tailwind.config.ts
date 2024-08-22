import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/**/*.tsx",
    "../../apps/web/src/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [sharedConfig],
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

export default config;
