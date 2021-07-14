import type { Listing, Sku } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { get as getStoreValue } from 'svelte/store';
import { toast } from '$ui/toast';
import { user } from '$lib/user';
import { openModal } from '$ui/modals';
import Order from '$lib/features/order/Order.svelte';

export function onOrderIntent({ sku, listing }: { sku: Sku; listing: Listing }): void {
  const currentUser = getStoreValue<User>(user);

  if (!currentUser) {
    toast.danger('You need to be <b>logged in</b> to complete your purchase!');
    return;
  }
  if (sku.issuer?._id === currentUser._id) {
    toast.danger('Cannot purchase your own SKU');
    return;
  }
  openModal(Order, {
    sku,
    listing,
    user: currentUser,
  });
}
