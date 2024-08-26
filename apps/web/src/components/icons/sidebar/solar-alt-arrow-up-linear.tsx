import type { SVGProps } from "react";
import React from "react";

export function SolarAltArrowUpLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m19 15l-7-6l-7 6"
      ></path>
    </svg>
  );
}
