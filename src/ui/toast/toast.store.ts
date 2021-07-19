import { writable } from 'svelte/store';
// eslint-disable-next-line unicorn/prevent-abbreviations
import type { ToastProps, ToastOptions, ToastSeverity } from './types';

let uid = 0;

const { subscribe, set, update } = writable<ToastProps[]>([]);

function add(message: string, severity: ToastSeverity, options: ToastOptions) {
  remove(options?.toastId);

  update((items): ToastProps[] => {
    const id = `toast-${++uid}`;
    const item = { message, severity, toastId: id, key: id, ...options };
    return [...items, item];
  });
}

function remove(toastId?: string) {
  update((items): ToastProps[] => items.filter((n) => n.toastId !== toastId));
}

function clear() {
  set([]);
}

const toast = {
  subscribe,
  clear,
  remove,
  danger: (message: string, options?: ToastOptions) => add(message, 'danger', options),
  warning: (message: string, options?: ToastOptions) => add(message, 'warning', options),
  info: (message: string, options?: ToastOptions) => add(message, 'info', options),
  success: (message: string, options?: ToastOptions) => add(message, 'success', options),
};

export default toast;
