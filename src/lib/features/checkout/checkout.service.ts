import type { Listing } from '$lib/sku-item/types';
import { handleWalletConnection } from '$lib/user';
import { toast } from '$ui/toast';
import { validETHdirectPurchase } from './checkout.api';

export let balance;
export let ethAddress;

export const connectWallet = async () => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
  }
};

export const checkValidETHAddress = (currency: 'USD' | 'ETH', validEthAddress: boolean) => {
  if (currency === 'ETH' && !validEthAddress) {
    toast.danger('Please enter a valid ERC20 address to send the NFT to.', { toastId: 'INVALID_ETH' });
    return false;
  }
  return true;
};

export const validETHPurchase = async (listing: Listing) => {
  return await validETHdirectPurchase(listing._id);
};
