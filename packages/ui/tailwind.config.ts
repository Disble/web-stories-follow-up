import { nextui } from "@nextui-org/react";
import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/**/src/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [sharedConfig],
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#094A73",
              foreground: "#FFFAF4",
            },
            secondary: {
              DEFAULT: "#FAB8CE",
              foreground: "#FFFAF4",
            },
            background: "#FFFAF4",
          },
        },
        dark: {
          colors: {
            primary: "#094A73",
            secondary: "#FAB8CE",
            background: "#FFFAF4",
            foreground: "#3E3E3E",
          },
        },
      },
    }),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

export default config;
