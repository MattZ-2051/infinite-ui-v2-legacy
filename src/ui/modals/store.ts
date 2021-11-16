import type { SvelteComponent } from 'svelte';
import { get, writable } from 'svelte/store';

export const exitBeforeEnter = writable(false);

/**
 * The transition state of the modals
 */
export const transitioning = writable(undefined);

/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable<Array<{ component: typeof SvelteComponent; props?: unknown }>>([]);

/**
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export const action = writable<null | undefined | 'push' | 'pop'>(undefined);

function pop(amount = 1) {
  modals.update((previous) => previous.slice(0, Math.max(0, previous.length - amount)));
}

/**
 * Closes all modals in the stack
 */
export function closeAllModals(): void {
  modals.set([]);
}

/**
 * Closes the last `amount` of modals in the stack
 */
export function closeModals(amount = 1): void {
  if (get(transitioning)) {
    return;
  }

  const modalsLength = get(modals).length;
  if (get(exitBeforeEnter) && modalsLength > 0) {
    transitioning.set(true);
  }
  exitBeforeEnter.set(false);

  action.set('pop');

  pop(amount);
}

/**
 * Closes the current modal component
 */
export function closeModal(): void {
  return closeModals(2);
}

/**
 * Opens a new modal
 */
export function openModal<T>(
  component: typeof SvelteComponent,
  properties?: T,
  options?: {
    // This modal will replace the last modal in the stack
    replace?: boolean;
  }
): void {
  if (get(transitioning)) {
    return;
  }

  action.set('push');

  if (get(exitBeforeEnter) && get(modals).length > 0) {
    transitioning.set(true);
  }
  exitBeforeEnter.set(false);

  if (options?.replace) {
    modals.update((previous) => [...previous.slice(0, -1), { component, props: properties }]);
  } else {
    modals.update((previous) => [...previous, { component, props: properties }]);
  }
}
