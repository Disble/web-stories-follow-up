import { nextui } from "@nextui-org/react";
import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  presets: [sharedConfig],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pacifico", "sans-serif"],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#1abc9c",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#e67e22",
              foreground: "#FFFFFF",
            },
            background: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            primary: "#1abc9c",
            secondary: "#e67e22",
            background: "#000000",
            foreground: "#FFFFFF",
          },
        },
      },
    }),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
