import type { Profile } from '$lib/sku-item/types';
import { get as getStoreValue } from 'svelte/store';
import type { User } from '$lib/user/types';
import { openModal } from '$ui/modals';
import { user } from '$lib/user';
import { toast } from '$ui/toast';
import NotifyModal from './NotifyModal.svelte';

export default function notify(node: HTMLButtonElement, data: { profile: Profile }) {
  const handleNotify = () => {
    const currentUser = getStoreValue<User>(user);
    if (!currentUser) {
      toast.danger(`Please sign in or create an account to subscribe for notifications.`);
      return;
    }
    openModal(NotifyModal, { ...data });
  };

  node.addEventListener('click', handleNotify);

  return {
    destroy() {
      node.removeEventListener('click', handleNotify);
    },
  };
}
