import { cn } from "#utils";

interface Props {
  className?: string;
}

export function ChevronDownIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5 stroke-primary", className)}
    >
      <path
        d="M19.0527 10L12.0527 17L5.05273 10"
        stroke="#094A73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
