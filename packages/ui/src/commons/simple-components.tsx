import { Chip, Tooltip } from "@nextui-org/react";
import { format } from "@formkit/tempo";
import { cn } from "#utils";

export function SimpleTextCell({
  text,
  isCapitalized,
}: {
  text: string | number;
  isCapitalized?: boolean;
}): JSX.Element {
  return (
    <div className="flex flex-col">
      <p
        className={cn("text-bold text-small", {
          capitalize: isCapitalized,
        })}
      >
        {text}
      </p>
    </div>
  );
}

export function SimpleTooltipCell({
  text,
  lineClamp = 2,
}: {
  text: string;
  lineClamp?: number;
}) {
  return (
    <Tooltip
      content={text}
      delay={500}
      classNames={{
        content: [
          "max-w-xs",
          "p-3",
          "max-h-48",
          "overflow-auto",
          "justify-start",
          "whitespace-pre-wrap",
        ],
      }}
    >
      <div className="flex flex-col">
        <p
          className={cn("max-w-xs text-small", {
            [`line-clamp-${lineClamp}`]: lineClamp && lineClamp > 0,
          })}
        >
          {text}
        </p>
      </div>
    </Tooltip>
  );
}

export function SimpleDateFormatCell({
  date,
  withTime,
}: {
  date: string | Date;
  withTime?: boolean;
}): JSX.Element {
  const timeString =
    withTime && date ? `, ${format(new Date(date), { time: "short" })}` : "";
  return (
    <span>
      {date ? `${format(new Date(date), "long", "es")}${timeString}` : "-"}
    </span>
  );
}

export function SimpleActiveChipCell({
  active,
  variant = "dot",
  options = {
    active: "Activo",
    inactive: "Inactivo",
  },
}: {
  active: boolean;
  variant?:
    | "dot"
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow";
  options?: {
    active: string;
    inactive: string;
  };
}) {
  return (
    <Chip
      className="gap-1 border-none capitalize text-default-600"
      color={active ? "success" : "danger"}
      size="sm"
      variant={variant}
    >
      {active ? options.active : options.inactive}
    </Chip>
  );
}
