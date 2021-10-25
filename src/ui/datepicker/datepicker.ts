import type { BaseOptions } from 'flatpickr/dist/types/options';

export function datePicker(node, config): SvelteActionReturn {
  (async () => {
    const [{ default: flatpickr }] = await Promise.all([import('flatpickr'), import('flatpickr/dist/flatpickr.css')]);
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
  })();
}
