import { cn } from "#utils";

interface Props {
  className?: string;
}

export function GlobeAltIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5 stroke-white", className)}
    >
      <g id="Icon/Outline/globe-alt">
        <path
          id="Icon"
          d="M21 12.5898C21 17.5604 16.9706 21.5898 12 21.5898M21 12.5898C21 7.61928 16.9706 3.58984 12 3.58984M21 12.5898H3M12 21.5898C7.02944 21.5898 3 17.5604 3 12.5898M12 21.5898C13.6569 21.5898 15 17.5604 15 12.5898C15 7.61928 13.6569 3.58984 12 3.58984M12 21.5898C10.3431 21.5898 9 17.5604 9 12.5898C9 7.61928 10.3431 3.58984 12 3.58984M3 12.5898C3 7.61928 7.02944 3.58984 12 3.58984"
          stroke="inherit"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
