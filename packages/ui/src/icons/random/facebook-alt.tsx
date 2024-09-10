import { cn } from "#utils";

interface Props {
  className?: string;
}

export function FacebookAltIcon({
  className = "stroke-black",
}: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M13.6574 10.6977H18.3824L17.8574 12.7977H13.6574V22.2477H11.5574V12.7977H7.35742V10.6977H11.5574V8.73206C11.5574 6.85991 11.7527 6.18056 12.1181 5.49596C12.4762 4.81955 13.0293 4.26642 13.7057 3.90836C14.3903 3.54296 15.0697 3.34766 16.9418 3.34766C17.4899 3.34766 17.9708 3.40016 18.3824 3.50516V5.44766H16.9418C15.5516 5.44766 15.1285 5.52956 14.6969 5.76056C14.3777 5.93066 14.1404 6.16796 13.9703 6.48716C13.7393 6.91871 13.6574 7.34186 13.6574 8.73206V10.6977Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}
