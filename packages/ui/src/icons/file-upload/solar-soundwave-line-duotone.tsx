import type { SVGProps } from "react";
import React from "react";

export function SolarSoundwaveLineDuotone(props: SVGProps<SVGSVGElement>) {
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
        <path d="M12 4v16"></path>
        <path d="M16 7v10M8 7v10" opacity={0.5}></path>
        <path d="M20 11v2M4 11v2"></path>
      </g>
    </svg>
  );
}
