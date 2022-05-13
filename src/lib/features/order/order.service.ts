import type { ValidETHListingData } from './types';
import type { Listing, Sku, Product } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import type { ApiError } from '$lib/api';
import { get as getStoreValue } from 'svelte/store';
import { toast } from '$ui/toast';
import { user, onSignIn, isLoading } from '$lib/user';
import { handleWalletConnection } from '$lib/metamask';
import routes from '$project/routes';
import { goto } from '$app/navigation';
import { loadWalletFx } from '../wallet/wallet.store';
import { validETHdirectPurchase } from '../checkout/checkout.api';

let validETHPurchase: ValidETHListingData;

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

  if (sku) {
    if (sku.currency === 'ETH') {
      try {
        isLoading.set(true);
        validETHPurchase = await validETHdirectPurchase(listing._id);
        isLoading.set(false);
      } catch {
        isLoading.set(false);
        validETHPurchase = undefined;
        return;
      }
    }

    if (sku?.currency === 'ETH' && !validETHPurchase) {
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
    }

    goto(routes.checkoutSku(sku._id));
  } else if (product) {
    if (product && product.owner?._id === currentUser._id) {
      toast.danger('You cannot purchase your own product.');
      return;
    }
    goto(routes.checkoutProduct(product._id));
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
