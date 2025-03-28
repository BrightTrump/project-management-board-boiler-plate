import React from "react";
import { ButtonProps } from "../types";

export default function PrimaryOutlinedRounded({
  children,
  className,
  disabled,
  isLoading,
  onClick,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`grid grid-flow-col gap-2 bg-white border border-[#A4BCFD] text-primary rounded-full items-center justify-center font-semibold text-sm px-5 py-2 ${
        disabled && "opacity-60"
      } ${className}`}
    >
      {isLoading && (
        <span className="block border-2 border-primary border-b-transparent w-4 h-4 rounded-full animate-spin"></span>
      )}

      {!isLoading && children}
    </button>
  );
}
