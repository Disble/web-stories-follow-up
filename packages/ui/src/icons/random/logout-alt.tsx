import { cn } from "#utils";

interface Props {
  className?: string;
}

export function LogoutAltIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M17 16.3555L21 12.3555M21 12.3555L17 8.35547M21 12.3555L7 12.3555M13 16.3555V17.3555C13 19.0123 11.6569 20.3555 10 20.3555H6C4.34315 20.3555 3 19.0123 3 17.3555V7.35547C3 5.69861 4.34315 4.35547 6 4.35547H10C11.6569 4.35547 13 5.69861 13 7.35547V8.35547"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
