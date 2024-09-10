import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const CreditCardOutlineIcon = (props: Props) => (
  <svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.16016 8.22909H17.7661M6.40592 12.2863H7.21737M10.4631 12.2863H11.2746M5.59448 15.5321H15.3318C16.6762 15.5321 17.7661 14.4422 17.7661 13.0977V6.6062C17.7661 5.26176 16.6762 4.17188 15.3318 4.17188H5.59448C4.25004 4.17188 3.16016 5.26176 3.16016 6.6062V13.0977C3.16016 14.4422 4.25004 15.5321 5.59448 15.5321Z"
      strokeWidth={1.40833}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { CreditCardOutlineIcon };
