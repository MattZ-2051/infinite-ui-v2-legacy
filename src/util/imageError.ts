/**
 * React when an image throws error or is already broken from SSR
 *
 * Usage:
 * <img src={photoUrl} use:imageError={() => (photoUrl = 'http://...')}>
 * or
 * <img src={photoUrl} use:imageError={'http://...'}>
 */
export default function fallbackImage(node: HTMLImageElement, fallback: string | (() => void)) {
  const handleError = () => {
    if (typeof fallback === 'string') {
      node.src = fallback;
    } else {
      fallback();
    }
  };

  // This is already broken
  if (node.naturalWidth === 0 && node.complete) {
    handleError();
  }

  node.addEventListener('error', handleError);

  return {
    destroy() {
      node.removeEventListener('error', handleError);
    },
  };
}
