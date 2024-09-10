import React from "react";
import type { SVGProps } from "react";

export function SolarAddCircleLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={12} r={10}></circle>
        <path strokeLinecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3"></path>
      </g>
    </svg>
  );
}
