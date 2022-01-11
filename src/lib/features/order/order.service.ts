import type { Listing, Sku, Product } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import type { ApiError } from '$lib/api';
import { get as getStoreValue } from 'svelte/store';
import { toast } from '$ui/toast';
import { user, onSignIn } from '$lib/user';
import { openModal } from '$ui/modals';
import routes from '$project/routes';
import OrderModal from '$lib/features/order/OrderModal.svelte';
import { loadWalletFx } from '../wallet/wallet.store';

export function onOrderIntent({ sku, listing, product }: { sku?: Sku; product?: Product; listing: Listing }): void {
  const currentUser = getStoreValue<User>(user);
  loadWalletFx();

  if (!currentUser) {
    toast.danger(
      `Please <a data-toast="signIn" class="cursor-pointer font-bold">sign in</a> to complete your purchase.`,
      {
        onClick: {
          signIn: onSignIn,
        },
        toastId: 'ORDER_ERROR_LOGIN',
      }
    );
    return;
  }

  if (sku && sku.issuer?._id === currentUser._id && listing.saleType === 'giveaway') {
    toast.danger('Whoops! You cannot claim your own SKU / NFT!');
    return;
  }
  if (sku && sku.issuer?._id === currentUser._id) {
    toast.danger('Whoops! You cannot purchase your own SKU / NFT.');
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
  });
}

export function handleSkuClaimError(error: ApiError) {
  switch (error?.data?.appCode) {
    case 'MAX_SKU_GIVEAWAY':
      return `This NFT giveaway is limited to 1 per user.`;
    case 'MAX_SKU_PURCHASE_PER_USER':
      return `This NFT giveaway is limited to 1 per user for the inital sale.`;
    default:
      return `There was an error processing your purchase. Please, try again or <a href=${routes.help}>contact support</a> if this issue continues.`;
  }
}
