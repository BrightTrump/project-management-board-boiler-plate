import React from "react";
import { IconProps } from "../types";

export default function Milestone({ color, size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 9.16667V14.5M8 2.5V4.5M2.66667 4.5C2.48986 4.5 2.32029 4.57024 2.19526 4.69526C2.07024 4.82029 2 4.98986 2 5.16667V8.5C2 8.67681 2.07024 8.84638 2.19526 8.9714C2.32029 9.09643 2.48986 9.16667 2.66667 9.16667H11.3333C11.6083 9.16669 11.8765 9.08169 12.1013 8.92333L14.384 7.37867C14.4714 7.31713 14.5426 7.2355 14.5918 7.14065C14.641 7.0458 14.6667 6.94052 14.6667 6.83367C14.6667 6.72682 14.641 6.62153 14.5918 6.52668C14.5426 6.43184 14.4714 6.3502 14.384 6.28867L12.1013 4.74333C11.8765 4.58497 11.6083 4.49998 11.3333 4.5H2.66667Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
