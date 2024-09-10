import React from "react";
import type { SVGProps } from "react";

export function SolarHamburgerMenuLineDuotone(props: SVGProps<SVGSVGElement>) {
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
        strokeWidth={1.5}
      >
        <path d="M20 7H4"></path>
        <path d="M20 12H4" opacity={0.5}></path>
        <path d="M20 17H4"></path>
      </g>
    </svg>
  );
}
