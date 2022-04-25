import type { ValidETHListingData } from './types';
import type { Listing, Sku, Product } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import type { ApiError } from '$lib/api';
import { get as getStoreValue } from 'svelte/store';
import { toast } from '$ui/toast';
import { user, onSignIn, isLoading } from '$lib/user';
import { handleWalletConnection } from '$lib/metamask';
import { openModal } from '$ui/modals';
import routes from '$project/routes';
import { goto } from '$app/navigation';
import OrderModal from '$lib/features/order/OrderModal.svelte';
import OrderModalETH from '$lib/features/order/OrderModalETH.svelte';
import { loadWalletFx } from '../wallet/wallet.store';
import { validETHdirectPurchase } from './order.api';

let validETHPurchase: ValidETHListingData;
let canOpenModal = false;

const ENABLE_CHECKOUT = import.meta.env?.VITE_ENABLE_CHECKOUT;

export const showLoginToast = (content = 'sign in', data = 'signIn') => {
  toast.danger(
    `Please <a data-toast="${data}" class="cursor-pointer font-bold">${content}</a> to complete your purchase.`,
    {
      onClick: {
        signIn: onSignIn,
        externalWallet: handleWalletConnection,
      },
      toastId: 'ORDER_ERROR_LOGIN',
    }
  );
};

export async function onOrderIntent({
  sku,
  listing,
  product,
}: {
  sku?: Sku;
  listing: Listing;
  product?: Product;
}): Promise<void> {
  const currentUser = getStoreValue<User>(user);
  loadWalletFx();

  try {
    isLoading.set(true);
    validETHPurchase = await validETHdirectPurchase(listing._id);
    isLoading.set(false);

    if (validETHPurchase) {
      if (ENABLE_CHECKOUT === 'true') {
        goto(`/checkout/sku/${sku._id}`);
        return;
      } else {
        openModal(OrderModalETH, {
          sku,
          product,
          listing,
          validETHPurchase,
        });
        return;
      }
    }
  } catch {
    isLoading.set(false);
    validETHPurchase = undefined;
    if (sku?.currency === 'ETH' && !validETHPurchase) {
      canOpenModal = false;
      toast.danger('Currently not available for purchase', { toastId: 'LISTING_UNAVAILABLE' });
      return;
    }

    if (currentUser) {
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

      canOpenModal = true;
    } else {
      canOpenModal = false;
      showLoginToast();
      return;
    }
  }

  if (canOpenModal) {
    openModal(OrderModal, {
      sku,
      product,
      listing,
      validETHPurchase,
    });
  }
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
