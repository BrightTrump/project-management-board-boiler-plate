"use client";

import React, { useEffect, useState } from "react";
import { Icon, Icons } from "../../ui";
import { ToastProps } from "./@types";

interface ToastItemProps extends ToastProps {}

const ToastItem = ({ message, title, type }: ToastItemProps) => {
  const [showToast, setShowToast] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const closeToast = () => {
    setShowToast(false);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeToast();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`bg-white relative overflow-hidden rounded-lg border transition-all duration-1000 ${
        type === "success"
          ? "border-[#029836]"
          : type === "info"
          ? "border-[#005AFF] bg-[#E6EFFF]"
          : type === "error" && "border-[#B3051D] bg-[#FDE6E9]"
      } ${showToast ? "right-0" : "right-[-105%]"} ${
        isVisible ? "grid" : "hidden"
      }`}
    >
      <span
        className={`absolute -top-28 -left-8 rounded-full block w-40 h-40 ${
          type === "success"
            ? "bg-[#029836]"
            : type === "info"
            ? "bg-[#005AFF]"
            : type === "error" && "bg-[#B3051D]"
        }`}
      ></span>
      <div
        className={` grid grid-cols-[auto_1fr_auto] gap-2 p-2 relative bg-white bg-opacity-70 backdrop-blur-[32px]`}
      >
        <Icon
          type={
            type === "success"
              ? Icons.TickSquare
              : type === "info"
              ? Icons.InfoSquare
              : Icons.DangerTriangle
          }
          size={20}
          color={
            type === "success"
              ? "#029836"
              : type === "info"
              ? "#005AFF"
              : type === "error"
              ? "#B3051D"
              : type === "warning"
              ? "#FF5F15"
              : ""
          }
        />

        <div className="toast-content">
          <p className={`font-semibold`}>{title}</p>
          <p className="text-xs">{message}</p>
        </div>

        <button
          className="w-6 h-6 rounded-full border border-[#F3F3F3] grid place-content-center"
          onClick={closeToast}
        >
          <Icon type={Icons.Close} size={12} color="#242424" />
        </button>
      </div>
    </div>
  );
};

export default ToastItem;
