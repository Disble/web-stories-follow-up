import type { ButtonProps, InputProps } from "@nextui-org/react";

export const inputStylesStone = {
  label: ["bg-[#F2F6FF]", "-top-0.5", "px-2", "text-foreground"],
  innerWrapper: "!items-center",
  inputWrapper: [
    "h-auto",
    "border-foreground",
    "rounded",
    "border",
    "data-[hover=true]:border-2",
    "data-[focus=true]:border-foreground",
    "group-data-[focus=true]:border-foreground",
  ],
} satisfies InputProps["classNames"];

export const btnStylesStone =
  "rounded-full px-10 font-semibold" satisfies ButtonProps["className"];
