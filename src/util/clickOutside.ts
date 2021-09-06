/**
 * Call callback when user clicks outside a given element
 *
 * Usage:
 * <div use:clickOutside={{ enabled: open, cb: () => open = false }}>
 */
export default function clickOutside(
  node: HTMLElement,
  { enabled: initialEnabled = true, cb }: { enabled?: boolean; cb: (event: MouseEvent) => void }
) {
  const handleOutsideClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      cb(event);
    }
  };

  function update({ enabled }: { enabled: boolean }) {
    if (enabled) {
      document.addEventListener('click', handleOutsideClick, { passive: true, capture: true });
    } else {
      document.removeEventListener('click', handleOutsideClick, { capture: true });
    }
  }

  if (initialEnabled) {
    update({ enabled: initialEnabled });
  }

  return {
    update,
    destroy() {
      update({ enabled: false });
    },
  };
}
