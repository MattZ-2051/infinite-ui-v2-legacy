export type ToastSeverity = 'info' | 'success' | 'danger' | 'warning';

export type ToastOptions = {
  toastId?: string;
  duration?: number;
  closeable?: boolean;
  pauseOnHover?: boolean;
  showProgressBar?: boolean;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export type ToastProps = ToastOptions & {
  toastId: string;
  message: string;
  severity?: ToastSeverity;
};
