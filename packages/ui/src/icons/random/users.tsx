import { cn } from "#utils";

interface Props {
  className?: string;
}

export function UsersIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5 stroke-white", className)}
    >
      <g id="Icon/Outline/users">
        <path
          id="Icon"
          d="M12.6 5.56153C13.3696 4.68959 14.4956 4.13965 15.75 4.13965C18.0696 4.13965 19.95 6.02005 19.95 8.33965C19.95 10.6592 18.0696 12.5396 15.75 12.5396C14.4956 12.5396 13.3696 11.9897 12.6 11.1178M15.75 23.0396H3.15002V21.9896C3.15002 18.5103 5.97063 15.6896 9.45002 15.6896C12.9294 15.6896 15.75 18.5103 15.75 21.9896V23.0396ZM15.75 23.0396H22.05V21.9896C22.05 18.5103 19.2294 15.6896 15.75 15.6896C14.6025 15.6896 13.5267 15.9964 12.6 16.5325M13.65 8.33965C13.65 10.6592 11.7696 12.5396 9.45002 12.5396C7.13043 12.5396 5.25002 10.6592 5.25002 8.33965C5.25002 6.02005 7.13043 4.13965 9.45002 4.13965C11.7696 4.13965 13.65 6.02005 13.65 8.33965Z"
          stroke="inherit"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
