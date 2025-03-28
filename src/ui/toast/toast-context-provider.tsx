"use client";

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ToastProps } from "./@types";

// Create a context and Define the context Initial State
export const ToastContext = createContext<{
  toasts: ToastProps[];
  setToasts: Dispatch<SetStateAction<ToastProps[]>>;
}>({
  toasts: [],
  setToasts: () => {},
});

// Type Interface for Toasr Context Provider
interface ToastContextProviderProps {
  children: React.ReactNode;
}

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
};
