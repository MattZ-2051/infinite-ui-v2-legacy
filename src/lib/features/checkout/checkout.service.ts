import { handleWalletConnection } from '$lib/user';
import { toast } from '$ui/toast';

export let balance;
export let ethAddress;

export const connectWallet = async () => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
  }
};
