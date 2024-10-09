import sharedConfig from "@repo/ui/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  presets: [sharedConfig],
};

export default config;
