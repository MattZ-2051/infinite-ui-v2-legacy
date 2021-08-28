import type { Profile } from '$lib/sku-item/types';
import { openModal } from '$ui/modals';
import NotifyModal from './NotifyModal.svelte';

export default function notify(node: HTMLButtonElement, data: { profile: Profile }) {
  const handleNotify = () => {
    openModal(NotifyModal, data);
  };

  node.addEventListener('click', handleNotify);

  return {
    destroy() {
      node.removeEventListener('click', handleNotify);
    },
  };
}
