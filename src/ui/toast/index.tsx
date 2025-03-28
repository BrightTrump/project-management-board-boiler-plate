"use client";

import ToastContainer from "./toast-container";
import { ToastContextProvider } from "./toast-context-provider";

interface Props {
  children: React.ReactNode;
}
export function Toast({ children }: Props) {
  return (
    <ToastContextProvider>
      <ToastContainer>{children}</ToastContainer>
    </ToastContextProvider>
  );
}
