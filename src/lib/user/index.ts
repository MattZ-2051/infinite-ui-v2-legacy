import type { User } from './types';
import type { Readable } from 'svelte/store';
import type { InfiniteExtension } from '$lib/features/infinite-wallet/types';
import { ethers } from 'ethers';
import { derived, get as getStoreValue, writable } from 'svelte/store';
import detectEthereumProvider from '@metamask/detect-provider';
import { session } from '$app/stores';
import { patch, post, get } from '$lib/api';
import routes from '$project/routes';
import { openModal } from '$ui/modals';

import AccountInitialSetupModal from '$lib/features/account/AccountInitialSetupModal.svelte';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
import { getClient } from '$lib/auth/auth0';
import { localStorageWritable } from '$util/localstorage-store';
import { toast } from '$ui/toast';

const userIdExternalIdMap = localStorageWritable<Pick<User, '_id' | 'externalId'>>('user:id', undefined);
const externalId = localStorageWritable<string>('user:externalId', undefined);
export const isLoading = writable<boolean>(AUTH_PROVIDER_IS_AUTH0);
export const authToken = writable<string>(<string>undefined);

// `undefined` means not yet decided
export const isAuthenticated = writable<boolean | undefined>(undefined);
export const user = writable<User>(undefined);
declare global {
  interface Window {
    wallet: InfiniteExtension | undefined;
  }
}

let provider: ethers.providers.Web3Provider;
/* eslint-disable @typescript-eslint/no-unused-vars */
let signer: ethers.providers.JsonRpcSigner;

export const walletConnected = writable<boolean>(false);

export const userId: Readable<string> = derived(
  [isAuthenticated, externalId, userIdExternalIdMap],
  ([$isAuthenticated, $externalId, $userIdExternalIdMap]) => {
    return $isAuthenticated && $externalId && $externalId === $userIdExternalIdMap?.externalId
      ? $userIdExternalIdMap._id
      : undefined;
  }
);

export async function updateUser(): Promise<User> {
  const me = await get<User>('users/me');
  externalId.set(me.externalId);
  userIdExternalIdMap.set({ _id: me._id, externalId: AUTH_PROVIDER_IS_AUTH0 ? me.externalId : me.cognitoId });
  user.set(me);
  return me;
}

export async function patchUser(data: Partial<User>) {
  const me = await patch<User>('users/me', data);
  user.set({ ...getStoreValue(user), ...me });
}

export function clearUser(): void {
  user.set(undefined);
  externalId.set(undefined);
  userIdExternalIdMap.set(undefined);
}

export async function getPersonalToken(): Promise<string> {
  const response = await post<{ token: string }>('users/personal-token', {});
  return response?.token;
}

export async function initUserAuth() {
  if (AUTH_PROVIDER_IS_AUTH0) {
    await initAuth();
    if (getStoreValue(isAuthenticated)) {
      updateUser();
    } else {
      clearUser();
    }
  } else {
    initSessionSubscription();
  }
}

let accountSetupTriggered = false;
export function mustSetupAccount(me: User, path: string) {
  if (accountSetupTriggered) {
    return;
  }

  const _mustSetupAccount = me && (!me.firstName || !me.lastName) && path !== routes.terms && path !== routes.privacy;

  if (_mustSetupAccount) {
    openModal(AccountInitialSetupModal, { user: me });

    accountSetupTriggered = true;
  }
}

export function isIssuer(u: User): boolean {
  return u?.roles && u.roles.includes('issuer');
}

let sessionUnsubscriber;

async function fetchNewSession() {
  try {
    const newSession = await fetch('/auth/refresh').then(async (response) => await response.json());

    if (getStoreValue(externalId) !== newSession?.user?.externalId) {
      externalId.set(newSession?.user?.externalId);
    }

    return newSession;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {};
  }
}

function initSessionSubscription() {
  if (sessionUnsubscriber) {
    sessionUnsubscriber();

    sessionUnsubscriber = undefined;
  }

  let sessionRefreshTimeout;

  sessionUnsubscriber = session.subscribe(async (_session) => {
    clearTimeout(sessionRefreshTimeout);

    if (!_session || _session.invalid) {
      externalId.set(undefined);
      clearUser();

      return;
    }

    if (_session.expired) {
      session.set(await fetchNewSession());

      return;
    }

    if (_session.expiration) {
      // Set the timeout to occur one minute before the JWT expiration.
      // The JWT expiration is set in seconds by AWS Cognito.
      const expiresAfterMilliseconds = _session.expiration * 1000 - Date.now() - 60_000;

      if (expiresAfterMilliseconds <= 0) {
        session.set(await fetchNewSession());

        return;
      }

      sessionRefreshTimeout = setTimeout(async () => {
        session.set(await fetchNewSession());
      }, expiresAfterMilliseconds);

      if (getStoreValue(externalId) !== _session?.user?.externalId) {
        externalId.set(_session?.user?.externalId);
      }

      updateUser();

      return;
    }
  });
}

async function initAuth(): Promise<void> {
  try {
    isLoading.set(true);

    const client = await getClient();
    const authenticated = await client.isAuthenticated();
    const _authToken = authenticated ? await getAuthToken() : undefined;

    if (authenticated) {
      const userHere = await client.getUser();
      externalId.set(userHere?.sub);
    }
    authToken.set(_authToken);
    isAuthenticated.set(authenticated);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error updating authorization: ${error}`);
  } finally {
    isLoading.set(false);
  }
}

async function login(returnUrl = window.location.pathname, options = {}) {
  isLoading.set(true);
  await logout('', true); // clean up previous session.

  const client = await getClient();
  let redirectUri = `${window.location.origin}/authorize`;
  if (returnUrl !== '/' && returnUrl !== '/authorize') {
    redirectUri += `?returnUrl=${returnUrl}`;
  }
  await client.loginWithRedirect({
    redirect_uri: redirectUri,
    ...options,
  });
}

async function logout(redirectUri: string, avoidRedirect?: boolean) {
  isLoading.set(true);

  const client = await getClient();

  if (!avoidRedirect) {
    client.logout({
      returnTo: redirectUri,
    });
  } else {
    client.logout();
  }
}

export async function getAuthToken(): Promise<string> {
  const client = await getClient();
  return await client.getTokenSilently();
}

export function onSignOut(avoidRedirect?: boolean) {
  if (window?.wallet?.account) window.wallet.logout();

  if (AUTH_PROVIDER_IS_AUTH0) {
    clearUser();
    logout(avoidRedirect ? `` : `${window.location.origin}`, avoidRedirect);
  } else {
    document.location.href = '/auth/signout';
  }
}

export function onSignUp() {
  if (AUTH_PROVIDER_IS_AUTH0) {
    return login(undefined, { screen_hint: 'signup' });
  } else {
    document.location.href = '/auth/signup';
  }
}

export function onSignIn(returnUrl = window.location.pathname) {
  if (AUTH_PROVIDER_IS_AUTH0) {
    return login(returnUrl);
  } else {
    document.location.href = `/auth/signin?returnUrl=${window.location.href}`;
  }
}

export async function handleRedirectCallback(callbackUrl: string) {
  const client = await getClient();
  await client.handleRedirectCallback(callbackUrl);
}

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

  throw new Error('Metamask extension not found on browser');
}

// I am managing the error in this way as we don't know if the code -32002 are included in other errors.
const handleMetamaskError = (errorMessage = '') => {
  if (errorMessage.toLowerCase().includes('wallet_requestPermissions'.toLowerCase())) {
    return 'Check Metamask extension and accept pending connection request.';
  }
  return errorMessage;
};

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
