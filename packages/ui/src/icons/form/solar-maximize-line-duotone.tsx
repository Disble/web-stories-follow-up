import type { SVGProps } from "react";
import React from "react";

export function SolarMaximizeLineDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="m9 15l-7 7m0 0h5.857M2 22v-5.857" opacity={0.6}></path>
        <path d="m15 9l7-7m0 0h-5.857M22 2v5.857"></path>
      </g>
    </svg>
  );
}
