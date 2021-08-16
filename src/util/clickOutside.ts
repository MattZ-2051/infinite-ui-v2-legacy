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
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
  }

  if (initialEnabled) {
    setTimeout(() => {
      update({ enabled: initialEnabled });
    });
  }

  return {
    update,
    destroy() {
      window.removeEventListener('click', handleOutsideClick);
    },
  };
}
