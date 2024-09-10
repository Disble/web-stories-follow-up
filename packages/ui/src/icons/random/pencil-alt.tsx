import { cn } from "#utils";

interface Props {
  className?: string;
}

export function PencilAltIcon({ className = "" }: Props): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 25"
      fill="none"
      className={cn("h-5 w-5 stroke-white", className)}
    >
      <path
        d="M11 5.78907H6C4.89543 5.78907 4 6.6845 4 7.78907V18.7891C4 19.8936 4.89543 20.7891 6 20.7891H17C18.1046 20.7891 19 19.8936 19 18.7891V13.7891M17.5858 4.37485C18.3668 3.5938 19.6332 3.5938 20.4142 4.37485C21.1953 5.1559 21.1953 6.42223 20.4142 7.20328L11.8284 15.7891H9L9 12.9606L17.5858 4.37485Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
