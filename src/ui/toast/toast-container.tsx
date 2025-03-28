import React, { useContext } from "react";
import ToastItem from "./toast-item";
import { ToastContext } from "./toast-context-provider";
import { ToastProps } from "./@types";

interface ToastContainerProps {
  children: React.ReactNode;
}

const ToastContainer = ({ children }: ToastContainerProps) => {
  const { toasts } = useContext(ToastContext);

  return (
    <>
      {toasts.length > 0 && (
        <div
          className={`fixed z-50 top-0 right-0 w-80 h-max flex flex-col-reverse gap-2 p-3 ${
            toasts.length > 0 && ""
          }`}
        >
          {toasts.map((toast: ToastProps, index: number) => (
            <ToastItem key={index} {...toast} />
          ))}
        </div>
      )}

      {children}
    </>
  );
};

export default ToastContainer;
