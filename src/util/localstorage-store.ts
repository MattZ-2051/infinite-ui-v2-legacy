// https://github.com/joshnuss/svelte-local-storage-store
import type { Writable } from 'svelte/store';
import { writable as internal, get } from 'svelte/store';

declare type Updater<T> = (value: T) => T;
declare type StoreDict = { [key: string]: Writable<unknown> };

const stores: StoreDict = {};

export function localStorageWritable<T>(key: string, initialValue: T, { distinct = true } = {}): Writable<T> {
  const browser = typeof localStorage !== 'undefined';

  function updateStorage(key_: string, value: T) {
    if (!browser) return;

    // eslint-disable-next-line unicorn/no-null
    const newValue = value ? JSON.stringify(value) : null;
    const oldValue = localStorage.getItem(key);
    if (distinct && newValue === oldValue) {
      return;
    }
    localStorage.setItem(key_, newValue);
  }

  if (!stores[key]) {
    const store = internal(initialValue, (set) => {
      // eslint-disable-next-line unicorn/no-null
      const json = browser ? localStorage.getItem(key) : null;

      if (json) {
        set(<T>JSON.parse(json));
      }

      if (browser) {
        const handleStorage = (event: StorageEvent) => {
          // eslint-disable-next-line unicorn/no-null
          if (event.key === key) set(event.newValue ? JSON.parse(event.newValue) : null);
        };

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
      }
    });

    const { subscribe, set } = store;

    stores[key] = {
      set(value: T) {
        updateStorage(key, value);
        set(value);
      },
      update(updater: Updater<T>) {
        const value = updater(get(store));

        updateStorage(key, value);
        set(value);
      },
      subscribe,
    };
  }

  return stores[key] as Writable<T>;
}
