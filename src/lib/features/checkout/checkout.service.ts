import type { CheckoutState, SkuPurchaseTransaction, ValidETHListingData } from './types';
import type { Listing, MintPolicy, Product, Sku } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import type { ApiError } from '$lib/api';
import { handleWalletConnection } from '$lib/metamask';
import { onSignIn } from '$lib/user';
import { openModal } from '$ui/modals';
import { toast } from '$ui/toast';
import routes from '$project/routes';
import { claimGiveawaySkuListing, purchaseSkuListing, validETHdirectPurchase } from './checkout.api';
import EthAddressModal from './EthAddressModal.svelte';
import { productBoughtCheckout, updateCheckoutState } from './checkout.store';
import { skuBought } from '../sku/sku.store';
import { pendingBuyCreated, productBought } from '../product/product.store';
import { placeBidFx } from '../product/auction/auction.store';

export let balance;
export let ethAddress;

const errorSupportMessage = `There was an error processing your purchase. Please, try again or <a href=${routes.help}>contact support</a> if this issue continues.`;

export const connectWallet = async (): Promise<boolean> => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to MetaMask', { toastId: 'MM_SUCCESS' });
  }
  return response;
};

export const checkValidETHAddress = (currency: 'USD' | 'ETH', validEthAddress: boolean): boolean => {
  if (currency === 'ETH' && !validEthAddress) {
    toast.danger('Please enter a valid ERC20 address to send the NFT to.', { toastId: 'INVALID_ETH' });
    return false;
  }
  return true;
};

export const validETHPurchase = async (listing: Listing): Promise<ValidETHListingData> => {
  return await validETHdirectPurchase(listing._id);
};

export const checkTerms = (acceptedTC: boolean): boolean => {
  if (!acceptedTC) {
    toast.danger('Please agree to the Terms and Conditions in order to move forward.', { toastId: 'TERMS' });
  }
  return acceptedTC;
};

export const showLoginToast = (): void => {
  toast.danger(
    `Please <a data-toast="signIn" class="cursor-pointer font-bold">sign in</a> to proceed with your purchase.`,
    {
      onClick: {
        signIn: () => onSignIn(),
      },
      toastId: 'ORDER_ERROR_LOGIN',
    }
  );
};

export const handlePayment = async ({
  id,
  user,
  handleEthModalCallback,
  skuMintPolicy,
}: {
  id: string;
  user: User;
  handleEthModalCallback: ({ address, option }: { address: string; option: string }) => void;
  skuMintPolicy: MintPolicy;
}) => {
  const mintPolicy = skuMintPolicy?.transaction;
  if (!user && mintPolicy === 'later') {
    showLoginToast();
    return id;
  }

  switch (id) {
    case 'mm': {
      const isWalletConnected = await connectWallet();
      if (isWalletConnected && validETHPurchase) {
        handleCheckoutStateChange('ordering-mm');
      } else {
        handleCheckoutStateChange('method-select');
      }
      break;
    }
    case 'cc-eth':
      if (!user) {
        showLoginToast();
      } else if (mintPolicy === 'later') {
        handleCheckoutStateChange('ordering-stripe');
      } else {
        openModal(EthAddressModal, { handleEthModalCallback, mintPolicy });
      }
      break;
    case 'cc-usd':
      if (!user) {
        showLoginToast();
      } else {
        handleCheckoutStateChange('ordering-stripe');
      }
      break;
    case 'balance':
      handleCheckoutStateChange('ordering-balance');
      break;
    default:
      handleCheckoutStateChange('method-select');
  }
  return id;
};

export const handleExit = () => {
  handleCheckoutStateChange('exit');
};

export const handleCheckoutStateChange = (value: CheckoutState) => {
  updateCheckoutState(value);
  localStorage.setItem('checkout-state', value);
};

export const claimGiveAway = async (listing: Listing): Promise<void> => {
  try {
    handleCheckoutStateChange('processing');
    const productId = await claimGiveawaySkuListing(listing._id);
    productBoughtCheckout({ id: productId });
    handleCheckoutStateChange('success');
    skuBought();
  } catch (error) {
    handleCheckoutStateChange('ordering-balance');
    toast.danger(handleSkuClaimError(error));
  }
};

export const handlePurchaseResult = (result: SkuPurchaseTransaction, sku: Sku, product: Product): void => {
  if (sku) {
    if (result?.status === 'pending') {
      updateCheckoutState('processing');
      pendingBuyCreated(sku._id);
    } else if (result?.status === 'success') {
      updateCheckoutState('success');
      skuBought();
    }
    if (!result || result.errorLog || result.status === 'error') {
      toast.danger(errorSupportMessage);
    }
  } else if (product) {
    if (result?.status === 'pending') {
      updateCheckoutState('processing');
      pendingBuyCreated(product._id);
    } else if (result?.status === 'success') {
      updateCheckoutState('success');
      productBought({ product });
    }
  }

  return;
};

export function handleSkuClaimError(error: ApiError) {
  switch (error?.data?.appCode) {
    case 'MAX_SKU_GIVEAWAY':
      return `This NFT giveaway is limited to 1 per user.`;
    case 'MAX_SKU_PURCHASE_PER_USER':
      return `This NFT giveaway is limited to 1 per user for the inital sale.`;
    default:
      return errorSupportMessage;
  }
}

export const purchaseItem = async (listing: Listing): Promise<SkuPurchaseTransaction> => {
  try {
    const result = await purchaseSkuListing(listing._id);
    if (result?.status === 'error') {
      toast.danger(errorSupportMessage);
      return;
    }
    return result;
  } catch (error) {
    handleSkuClaimError(error);
  }
};

export const placeCheckoutBid = async (listing: Listing, amount: number): Promise<void> => {
  if (amount <= 0) {
    toast.danger(
      `The bid amount needs to be at least $${listing.auctionBidIncrement} more than the highest bid. Please place a higher bid.`
    );
    return;
  }
  await placeBidFx({ listing, amount });
};
