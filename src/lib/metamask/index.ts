import { ethers } from 'ethers';
import { writable } from 'svelte/store';
import detectEthereumProvider from '@metamask/detect-provider';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';

import { toast } from '$ui/toast';

let provider: ethers.providers.Web3Provider;
/* eslint-disable @typescript-eslint/no-unused-vars */
let signer: ethers.providers.JsonRpcSigner;

export const walletConnected = writable<boolean>(false);
export const isLoading = writable<boolean>(AUTH_PROVIDER_IS_AUTH0);

// I am managing the error in this way as we don't know if the code -32002 are included in other errors.
const handleMetamaskError = (errorMessage = '') => {
  if (errorMessage.toLowerCase().includes('wallet_requestPermissions'.toLowerCase())) {
    return 'Check MetaMask extension and accept pending connection request.';
  }
  return errorMessage;
};

export async function checkWalletInstalled() {
  if (typeof window?.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');
    const metamaskProvider = (await detectEthereumProvider({ mustBeMetaMask: true })) as ethers.providers.Web3Provider;

    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });

    if (metamaskProvider) {
      metamaskProvider.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          walletConnected.set(false);
        }
      });
    }

    // Check if user is already connected
    const addresses = await provider.listAccounts();
    if (addresses.length > 0) {
      signer = provider.getSigner();
      walletConnected.set(true);
    } else {
      walletConnected.set(false);
    }
    return;
  }
  throw new Error('MetaMask extension not found on browser');
}

export async function connectWallet() {
  /*  eslint-disable promise/always-return */
  return checkWalletInstalled()
    .then(async () => {
      isLoading.set(true);
      try {
        await provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        walletConnected.set(true);
        isLoading.set(false);
      } catch (error) {
        isLoading.set(false);
        walletConnected.set(false);
        throw error;
      }
    })
    .catch((error) => {
      isLoading.set(false);
      walletConnected.set(false);
      throw error;
    });
}

export async function handleWalletConnection() {
  try {
    await connectWallet();
    return true;
  } catch (error) {
    if (error?.code) {
      toast.danger(handleMetamaskError(error?.message), { toastId: error?.code });
    } else if (error?.message === 'User is not logged in to MetaMask') {
      toast.danger(error?.message, { toastId: 'MM-NOT-LOGGED' });
    } else {
      toast.danger(error?.message, { toastId: 'MM-NOT-FOUND' });
      window.open('https://metamask.io/download/', '_blank').focus();
    }
    return false;
  }
}

export async function disconnectWallet() {
  provider = undefined;
  signer = undefined;
  walletConnected.set(false);
}

export async function getWalletInfo() {
  const address = await signer.getAddress();
  const response = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(response);
  return { balance, address };
}

export async function sendEthPurchasePaymentForLazyMinting(
  destinationAddress: string,
  totalCost: number,
  fromUserId: string,
  voucherCode?: string
) {
  const ethereumMetadata = ['0x01', `0x${fromUserId || ''}`, '0x01'];
  if (voucherCode) {
    ethereumMetadata.push(ethers.utils.formatBytes32String(voucherCode));
  }
  return sendTransaction(destinationAddress, totalCost, ethereumMetadata);
}

export async function sendEthPurchasePaymentForImmediateMinting(
  destinationAddress: string,
  totalCost: number,
  fromUserId?: string,
  voucherCode?: string
) {
  const ethereumMetadata = ['0x01', `0x${fromUserId || ''}`, '0x00'];
  if (voucherCode) {
    ethereumMetadata.push(ethers.utils.formatBytes32String(voucherCode));
  }
  return sendTransaction(destinationAddress, totalCost, ethereumMetadata);
}

export async function sendTransaction(destinationAddress: string, totalCost: number, data?: string[]) {
  const address = await signer.getAddress();
  const rawTrx = {
    from: address,
    to: destinationAddress,
    nonce: await provider.getTransactionCount(address, 'latest'),
    value: ethers.utils.parseEther(totalCost.toString()),
  };
  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawTrx as any).data = ethers.utils.RLP.encode(data);
  }

  return await signer.sendTransaction(rawTrx);
}

export async function checkNetwork() {
  const chainId = await signer.getChainId();
  return ethers.providers.getNetwork(chainId);
}
