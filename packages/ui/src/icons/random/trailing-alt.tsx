import { cn } from "#utils";

interface Props {
  className?: string;
}

export function TrailingAltIcon({
  className = "stroke-black",
}: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <g clipPath="url(#clip0_335_4248)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 14C18.47 14 14 18.47 14 24C14 29.53 18.47 34 24 34C29.53 34 34 29.53 34 24C34 18.47 29.53 14 24 14ZM24 32C19.59 32 16 28.41 16 24C16 19.59 19.59 16 24 16C28.41 16 32 19.59 32 24C32 28.41 28.41 32 24 32ZM24 22.59L27.59 19L29 20.41L25.41 24L29 27.59L27.59 29L24 25.41L20.41 29L19 27.59L22.59 24L19 20.41L20.41 19L24 22.59Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_335_4248">
          <rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
