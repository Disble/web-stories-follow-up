import { cn } from "#utils";

interface Props {
  className?: string;
}

export function HomeIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5 stroke-white", className)}
    >
      <g id="Icon/Outline/home">
        <path
          id="Icon"
          d="M3.14001 12.5906L5.24001 10.4906M5.24001 10.4906L12.59 3.14062L19.94 10.4906M5.24001 10.4906V20.9906C5.24001 21.5705 5.71012 22.0406 6.29001 22.0406H9.44001M19.94 10.4906L22.04 12.5906M19.94 10.4906V20.9906C19.94 21.5705 19.4699 22.0406 18.89 22.0406H15.74M9.44001 22.0406C10.0199 22.0406 10.49 21.5705 10.49 20.9906V16.7906C10.49 16.2107 10.9601 15.7406 11.54 15.7406H13.64C14.2199 15.7406 14.69 16.2107 14.69 16.7906V20.9906C14.69 21.5705 15.1601 22.0406 15.74 22.0406M9.44001 22.0406H15.74"
          stroke="inherit"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
