import type { Profile } from '$lib/sku-item/types';
import { handleNotify } from './notify.service';

export default function notify(node: HTMLButtonElement, data: { profile: Profile }) {
  const notifyHandler = () => {
    handleNotify(data);
  };

  node.addEventListener('click', notifyHandler);

  return {
    destroy() {
      node.removeEventListener('click', notifyHandler);
    },
  };
}
