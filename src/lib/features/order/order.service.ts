import type { ValidETHListingData } from './types';
import type { Listing, Sku, Product } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import type { ApiError } from '$lib/api';
import { get as getStoreValue } from 'svelte/store';
import { browser } from '$app/env';
import { toast } from '$ui/toast';
import {
  user,
  onSignIn,
  isLoading,
  handleWalletConnection,
  checkWalletInstalled,
  walletConnected as metamaskConnected,
} from '$lib/user';
import { openModal } from '$ui/modals';
import routes from '$project/routes';
import OrderModal from '$lib/features/order/OrderModal.svelte';
import { loadWalletFx } from '../wallet/wallet.store';
import { validETHdirectPurchase } from './order.api';

let validETHPurchase: ValidETHListingData;
let canOpenModal = false;

if (browser) {
  checkWalletInstalled();
}

const connectWallet = async () => {
  await handleWalletConnection();
  if (metamaskConnected) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
  }
};

const showLoginToast = (content = 'sign in', data = 'signIn') => {
  toast.danger(
    `Please <a data-toast="${data}" class="cursor-pointer font-bold">${content}</a> to complete your purchase.`,
    {
      onClick: {
        signIn: onSignIn,
        externalWallet: connectWallet,
      },
      toastId: 'ORDER_ERROR_LOGIN',
    }
  );
};

export async function onOrderIntent({
  sku,
  listing,
  product,
  walletConnected,
}: {
  sku?: Sku;
  listing: Listing;
  product?: Product;
  walletConnected?: boolean;
}): Promise<void> {
  const currentUser = getStoreValue<User>(user);
  loadWalletFx();

  try {
    isLoading.set(true);
    validETHPurchase = await validETHdirectPurchase(listing._id);
    if (validETHPurchase && !walletConnected) {
      showLoginToast('connect your wallet', 'externalWallet');
      canOpenModal = false;
    } else {
      canOpenModal = true;
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

  isLoading.set(false);

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
