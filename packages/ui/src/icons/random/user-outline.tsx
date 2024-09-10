import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const UserOutlineIcon = (props: Props) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <path
        d="M11.9919 5.20729C11.9919 6.76289 10.7309 8.02396 9.17526 8.02396C7.61966 8.02396 6.35859 6.76289 6.35859 5.20729C6.35859 3.65169 7.61966 2.39062 9.17526 2.39062C10.7309 2.39062 11.9919 3.65169 11.9919 5.20729Z"
        strokeWidth={1.40833}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.17526 10.1365C6.45296 10.1365 4.24609 12.3433 4.24609 15.0656H14.1044C14.1044 12.3433 11.8976 10.1365 9.17526 10.1365Z"
        strokeWidth={1.40833}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export { UserOutlineIcon };
