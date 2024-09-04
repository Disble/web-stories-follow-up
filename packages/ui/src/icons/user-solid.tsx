import { cn } from "#utils";

interface Props {
  className?: string;
}

export function UserSolidIcon({
  className = "stroke-white",
}: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <circle cx="24" cy="24" r="24" fill="#96B8BA" />
      <path
        d="M12.7484 34.9147C16.2191 32.953 20.2288 31.8333 24.5 31.8333C28.7712 31.8333 32.7809 32.953 36.2516 34.9147M29.625 21.5833C29.625 24.4138 27.3305 26.7083 24.5 26.7083C21.6695 26.7083 19.375 24.4138 19.375 21.5833C19.375 18.7529 21.6695 16.4583 24.5 16.4583C27.3305 16.4583 29.625 18.7529 29.625 21.5833ZM39.875 25C39.875 33.4914 32.9914 40.375 24.5 40.375C16.0086 40.375 9.125 33.4914 9.125 25C9.125 16.5086 16.0086 9.625 24.5 9.625C32.9914 9.625 39.875 16.5086 39.875 25Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
