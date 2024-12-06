import React from "react";
import type { SVGProps } from "react";

export function SolarArrowRightLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
      ></path>
    </svg>
  );
}
