import type { CheckoutState, ValidETHListingData } from './types';
import type { Listing } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { handleWalletConnection } from '$lib/user';
import { openModal } from '$ui/modals';
import { toast } from '$ui/toast';
import { validETHdirectPurchase } from './checkout.api';
import { updateCheckoutState } from './checkout.store';
import EthAddressModal from './EthAddressModal.svelte';

export let balance;
export let ethAddress;

export const connectWallet = async (): Promise<void> => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
  }
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
    return false;
  }

  return true;
};

export const showLoginToast = (onSignIn?: () => Promise<void>): void => {
  toast.danger(
    `Please <a data-toast="signIn" class="cursor-pointer font-bold">sign in</a> to proceed with your purchase.`,
    {
      onClick: {
        signIn: onSignIn,
      },
      toastId: 'ORDER_ERROR_LOGIN',
    }
  );
};

export const handlePayment = async ({
  id,
  walletConnected,
  user,
  handleEthModalCallback,
}: {
  id: string;
  walletConnected: boolean;
  user: User;
  handleEthModalCallback: ({ address, option }: { address: string; option: string }) => void;
}) => {
  if (id === 'mm' && !walletConnected) {
    await connectWallet();
  } else if (id === 'mm' && walletConnected && validETHPurchase) {
    handleStateChange('ordering-mm');
    return id;
  } else if (id === 'cc') {
    if (!user) {
      showLoginToast();
    } else {
      openModal(EthAddressModal, { handleEthModalCallback });
    }
  }
  return id;
};

export const handleExit = () => {
  updateCheckoutState('exit');
};

export const handleStateChange = (value: CheckoutState) => {
  updateCheckoutState(value);
  localStorage.setItem('checkout-state', value);
};
