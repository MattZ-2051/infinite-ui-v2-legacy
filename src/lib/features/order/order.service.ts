import type { Listing, Sku, Product } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { get as getStoreValue } from 'svelte/store';
import { toast } from '$ui/toast';
import { user } from '$lib/user';
import { openModal } from '$ui/modals';
import OrderModal from '$lib/features/order/OrderModal.svelte';

export function onOrderIntent({ sku, listing, product }: { sku?: Sku; product?: Product; listing: Listing }): void {
  const currentUser = getStoreValue<User>(user);

  if (!currentUser) {
    toast.danger('You need to be <b>logged in</b> to complete your purchase!');
    return;
  }
  if (sku && sku.issuer?._id === currentUser._id) {
    toast.danger('Cannot purchase your own SKU');
    return;
  }
  if (product && product.owner?._id === currentUser._id) {
    toast.danger('Cannot purchase your own product');
    return;
  }
  openModal(OrderModal, {
    sku,
    product,
    listing,
    user: currentUser,
  });
}
