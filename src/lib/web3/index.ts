import type { EtherscanResponse } from '$lib/payment/crypto/etherscan/types';
import { ethers } from 'ethers';
import { writable } from 'svelte/store';
import detectEthereumProvider from '@metamask/detect-provider';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
import routes from '$project/routes';
import { goto } from '$app/navigation';

import { toast } from '$ui/toast';
import { mobileAndTabletCheck } from '$util/detectMobile';
import { get } from '$lib/api';
import { variables } from '$lib/variables';

interface EthersContract {
  contractAddress: string;
  contractAbi?: ethers.ContractInterface;
}

const apiUrl = `${variables.ethNetwork.nftTransactionApiUrl}/`;
const apiKey = variables.ethNetwork.apiKey as string;
const isProduction = variables.ethNetwork.mmNetwork === 'mainnet';

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
    if (isProduction) {
      const network = await checkNetwork();
      if (network.chainId !== 1) {
        toast.danger('Please connect to Ethereum Mainnet.', { toastId: 'WRONG_NETWORK' });
        walletConnected.set(false);
        return;
      }
    }
    return true;
  } catch (error) {
    if (error?.code) {
      toast.danger(handleMetamaskError(error?.message), { toastId: error?.code });
    } else if (error?.message === 'User is not logged in to MetaMask') {
      toast.danger(error?.message, { toastId: 'MM-NOT-LOGGED' });
    } else {
      const url = window?.location?.href;
      if (mobileAndTabletCheck()) goto(routes.index);
      toast.danger(error?.message, { toastId: 'MM-NOT-FOUND' });
      window.open(`https://metamask.app.link/dapp/${url}`, '_blank').focus();
    }
    return false;
  }
}

export async function disconnectWallet() {
  provider = undefined;
  signer = undefined;
  walletConnected.set(false);
  window.location.reload();
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

export async function mintTo({
  contractAddress,
  contractAbi,
  amount,
  price,
}: EthersContract & { amount: number; price: string }) {
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return await contract.mintTo(amount, { value: ethers.utils.parseEther(price) });
}

export async function getSaleStatus({ contractAddress, contractAbi }: EthersContract) {
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return await contract.saleStarted();
}

export async function getNumberOfTokensOwned({ contractAddress, contractAbi }: EthersContract) {
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return await contract.getTokenCount();
}

export async function getPendingTransaction(tx: string) {
  const { transactionHash } = await provider.waitForTransaction(tx);
  return transactionHash;
}

export async function getTotalSupply({ contractAddress }: EthersContract) {
  const result = await get<EtherscanResponse<string>>(apiUrl, {
    params: {
      module: 'stats',
      action: 'tokensupply',
      contractaddress: `${contractAddress}`,
      apikey: apiKey,
    },
  });

  return result;
}
