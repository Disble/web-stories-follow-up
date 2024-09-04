import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const LockClosedOutlineIcon = (props: Props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.2639 12.4896V14.079M5.49567 17.2579H15.0322C15.91 17.2579 16.6216 16.5463 16.6216 15.6685V10.9002C16.6216 10.0224 15.91 9.3108 15.0322 9.3108H5.49567C4.61786 9.3108 3.90625 10.0224 3.90625 10.9002V15.6685C3.90625 16.5463 4.61786 17.2579 5.49567 17.2579ZM13.4428 9.3108V6.13196C13.4428 4.37634 12.0195 2.95312 10.2639 2.95312C8.5083 2.95312 7.08509 4.37634 7.08509 6.13196V9.3108H13.4428Z"
      strokeWidth={1.40833}
      strokeLinecap="round"
    />
  </svg>
);

export { LockClosedOutlineIcon };
