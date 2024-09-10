import { cn } from "#utils";

interface Props {
  className?: string;
}

export function StarIcon({ className = "stroke-white" }: Props): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
    >
      <path
        id="Star 2"
        d="M11.8545 0.267578L14.5487 8.55937H23.2672L16.2137 13.684L18.9079 21.9758L11.8545 16.8512L4.80107 21.9758L7.49524 13.684L0.441814 8.55937H9.16032L11.8545 0.267578Z"
        fill="#0995F8"
      />
    </svg>
  );
}
