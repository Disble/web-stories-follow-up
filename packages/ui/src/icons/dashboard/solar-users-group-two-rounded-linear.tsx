import React from "react";
import type { SVGProps } from "react";

export function SolarUsersGroupTwoRoundedLinear(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={6} r={4}></circle>
        <path
          strokeLinecap="round"
          d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4"
        ></path>
        <ellipse cx={12} cy={17} rx={6} ry={4}></ellipse>
        <path
          strokeLinecap="round"
          d="M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5"
        ></path>
      </g>
    </svg>
  );
}
