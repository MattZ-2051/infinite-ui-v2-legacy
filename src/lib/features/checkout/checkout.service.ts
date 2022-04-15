import type { CheckoutState, ValidETHListingData } from './types';
import type { Listing, MintPolicy } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { handleWalletConnection } from '$lib/metamask';
import { onSignIn } from '$lib/user';
import { openModal } from '$ui/modals';
import { toast } from '$ui/toast';
import { validETHdirectPurchase } from './checkout.api';
import { updateCheckoutState } from './checkout.store';
import EthAddressModal from './EthAddressModal.svelte';

export let balance;
export let ethAddress;

export const connectWallet = async (): Promise<boolean> => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
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
  } else if (id === 'mm') {
    const isWalletConnected = await connectWallet();
    if (isWalletConnected && validETHPurchase) {
      handleStateChange('ordering-mm');
    }
    return id;
  } else if (id === 'cc') {
    if (!user) {
      showLoginToast();
    } else if (mintPolicy === 'later') {
      handleStateChange('ordering-stripe');
    } else {
      openModal(EthAddressModal, { handleEthModalCallback, mintPolicy });
    }
  }
  return id;
};

export const handleExit = () => {
  handleStateChange('exit');
};

export const handleStateChange = (value: CheckoutState) => {
  updateCheckoutState(value);
  localStorage.setItem('checkout-state', value);
};
