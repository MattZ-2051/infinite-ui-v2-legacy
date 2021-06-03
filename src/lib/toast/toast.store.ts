import { writable } from 'svelte/store';
import type { Updater } from 'svelte/store';

let uid = 0;

export type ToastType = 'info' | 'success' | 'danger' | 'warning';

export type Toast = {
  id: string;
  text: string;
  type: ToastType;
  // timeout: number; // TODO: implement auto close
  closeable: boolean;
};

const DEFAULT_OPTIONS = {
  timeout: 5000,
  closeable: true,
  type: 'info' as ToastType,
};

type ToastUpdater = (this: void, updater: Updater<Toast[]>) => void;

function add(text: string, options: Partial<Toast>, update: ToastUpdater) {
  const item: Toast = { ...DEFAULT_OPTIONS, id: `toast-${++uid}`, ...options, text };

  update((items): Toast[] => {
    return [...items, item];
  });
}

function remove(id: string, update: ToastUpdater) {
  update((items): Toast[] => {
    return items.filter((n) => n.id !== id);
  });
}

function clear(set) {
  set([]);
}

const createStore = () => {
  const { subscribe, set, update } = writable<Toast[]>([]);

  return {
    subscribe,
    danger: (text: string, options?: Partial<Toast>) =>
      add(text, { ...options, type: 'danger' }, update),
    warning: (text: string, options?: Partial<Toast>) =>
      add(text, { ...options, type: 'warning' }, update),
    info: (text: string, options?: Partial<Toast>) =>
      add(text, { ...options, type: 'info' }, update),
    success: (text: string, options?: Partial<Toast>) =>
      add(text, { ...options, type: 'success' }, update),
    remove: (itemId: string) => remove(itemId, update),
    clear: (): void => clear(set),
  };
};

export default createStore();
