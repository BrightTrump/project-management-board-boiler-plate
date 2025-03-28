import React from "react";
import { IconProps } from "../types";

export default function Ellipse({ color, size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="8" />
    </svg>
  );
}
