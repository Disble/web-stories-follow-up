import { cn } from "#utils";

interface Props {
  className?: string;
}

export function DotsHorizontalIcon({
  className = "stroke-black",
}: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M5.5 12.1055H5.51M12.5 12.1055H12.51M19.5 12.1055H19.51M6.5 12.1055C6.5 12.6578 6.05228 13.1055 5.5 13.1055C4.94772 13.1055 4.5 12.6578 4.5 12.1055C4.5 11.5532 4.94772 11.1055 5.5 11.1055C6.05228 11.1055 6.5 11.5532 6.5 12.1055ZM13.5 12.1055C13.5 12.6578 13.0523 13.1055 12.5 13.1055C11.9477 13.1055 11.5 12.6578 11.5 12.1055C11.5 11.5532 11.9477 11.1055 12.5 11.1055C13.0523 11.1055 13.5 11.5532 13.5 12.1055ZM20.5 12.1055C20.5 12.6578 20.0523 13.1055 19.5 13.1055C18.9477 13.1055 18.5 12.6578 18.5 12.1055C18.5 11.5532 18.9477 11.1055 19.5 11.1055C20.0523 11.1055 20.5 11.5532 20.5 12.1055Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
