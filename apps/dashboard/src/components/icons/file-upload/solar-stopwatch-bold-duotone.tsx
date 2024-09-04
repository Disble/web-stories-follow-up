import type { SVGProps } from "react";
import React from "react";

export function SolarStopwatchBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 23a9 9 0 1 0 0-18a9 9 0 0 0 0 18"
        opacity={0.5}
      ></path>
      <path
        fill="currentColor"
        d="M12 9.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.25 2.75A.75.75 0 0 1 10 2h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
