export interface ToastProps {
  type?: ToastTypes;
  title?: string;
  name?: string;
  message?: string;
}

export type ToastTypes = "success" | "error" | "info";
