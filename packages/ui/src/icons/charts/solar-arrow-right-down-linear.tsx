import React from "react";
import type { SVGProps } from "react";

export function SolarArrowRightDownLinear(props: SVGProps<SVGSVGElement>) {
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
        d="m6 6l12 12m0 0V9m0 9H9"
      ></path>
    </svg>
  );
}
