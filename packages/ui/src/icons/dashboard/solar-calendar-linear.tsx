import React from "react";
import type { SVGProps } from "react";

export function SolarCalendarLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M7 4V2.5M17 4V2.5M2.5 9h19"
        ></path>
        <path
          fill="currentColor"
          d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        ></path>
      </g>
    </svg>
  );
}
