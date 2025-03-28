// useToast.ts
import { useContext } from "react";
import { ToastContext } from "./toast-context-provider";
import { ToastProps } from "./@types";

interface CallToastProps extends ToastProps {}

export function useToast() {
  const { setToasts } = useContext(ToastContext);

  const callToast = ({ type, title, message }: CallToastProps) => {
    setToasts((prevToasts: ToastProps[]) => [
      ...prevToasts,
      { title, message, type },
    ]);
  };

  return {
    callToast,
  };
}
