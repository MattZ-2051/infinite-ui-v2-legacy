import { writable, derived, get } from 'svelte/store';
import { createFocusTrap, Options } from 'focus-trap';

export type FocusTrapOptions = {
  /**
   * By default, the `FocusTrap` activates when it mounts. So you activate and deactivate it via mounting and unmounting.
   * If, however, you want to keep the `focusTrap` mounted *while still toggling its activation state*, you can do that with this prop.
   */
  active?: boolean;
  /**
   * If you would like to pause or unpause the focus trap (see [`focus-trap`'s documentation](https://github.com/focus-trap/focus-trap#focustrappause)), toggle this prop.
   */
  paused?: boolean;
  /**
   * Pass any of the options available in [`focus-trap`'s `createOptions`](https://github.com/focus-trap/focus-trap#focustrap--createfocustrapelement-createoptions).
   */
  focusTrapOptions?: Options;
};

const defaultOptions: FocusTrapOptions = {
  active: true,
  paused: false,
  focusTrapOptions: {},
};

/**
 * Trap focus within a DOM node.
 *
 * Usage:
 * <div use:trapFocus={{ active, paused, focusTrapOptions }}>
 */
export default function trapFocus(node: HTMLElement, options?: FocusTrapOptions) {
  const options_ = writable<FocusTrapOptions>(options);
  const safeOptions = derived(options_, ($options_) => ({ ...defaultOptions, ...$options_ }));
  const { focusTrapOptions } = get(safeOptions);
  const focusTrap = createFocusTrap(node, focusTrapOptions);

  const unsubscribe = safeOptions.subscribe((safeOptions_: FocusTrapOptions) => {
    const { active, paused } = safeOptions_;
    active ? focusTrap.activate() : focusTrap.deactivate();
    paused ? focusTrap.pause() : focusTrap.unpause();
  });

  function update(newOptions_: FocusTrapOptions) {
    options_.set(newOptions_);
  }

  function destroy() {
    focusTrap.deactivate();
    unsubscribe();
  }

  return {
    update,
    destroy,
  };
}
