import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function Avatar({ alt, className, height, src, width }: AvatarProps) {
  if (!src) {
    return (
      <span className="relative grid content-end justify-center w-5 h-5 rounded-full overflow-hidden bg-[linear-gradient(0deg,_#FFC9B3_0%,_#FFD2C2_100%)]">
        <Image src={"/user.svg"} width={16} height={18.22} alt="User Icon" />
      </span>
    );
  }
  return <div></div>;
}
