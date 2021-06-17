import type { BaseOptions } from 'flatpickr/dist/types/options';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export function datePicker(node, config): SvelteActionReturn {
  const instance = flatpickr(node, config);

  return {
    update(newConfig: BaseOptions) {
      for (const item in newConfig) {
        instance.set(item as keyof BaseOptions, newConfig[item]);
      }
    },
    destroy() {
      instance.destroy();
    },
  };
}
