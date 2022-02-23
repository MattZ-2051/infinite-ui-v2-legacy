import { checkWalletInstalled, handleWalletConnection } from '$lib/user';
import { toast } from '$ui/toast';
import { browser } from '$app/env';

if (browser) {
  checkWalletInstalled();
}

export const connectWallet = async () => {
  const response = await handleWalletConnection();
  if (response) {
    toast.clear();
    toast.success('You are now connected to Metamask', { toastId: 'MM_SUCCESS' });
  }
};
