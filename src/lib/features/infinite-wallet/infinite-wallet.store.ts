import type { InfiniteExtension, InfiniteExtensionState, AccountData, AccountError } from './types';
import { createEffect, createStore } from 'effector';
import { browser } from '$app/env';
import { variables } from '$lib/variables';
import { toast } from '$ui/toast';

// Declare injected wallet object as property of window
declare global {
  interface Window {
    wallet: InfiniteExtension | undefined;
  }
}

// Runtime type check to handle wallet state with 'isError' property
const isError = (account: AccountData | AccountError): account is AccountError => {
  return (account as AccountError)?.isError !== undefined;
};

// Effect to load wallet state on component mount
export const InfiniteExtensionLoadFx = createEffect(() => {
  const { wallet } = window;
  if (wallet === undefined) return { extensionAvailable: false };

  const { account } = wallet;

  const extensionState: InfiniteExtensionState = {
    extensionAvailable: wallet !== undefined,
    walletLocked: isError(account) && (account as AccountError).type === 'locked',
    logedIn: account !== null && !isError(account),
    current: account !== null && !isError(account) ? account : undefined,
  };
  return extensionState;
});

// Effect to handle wallet login requests
export const InfiniteExtensionLoginFx = createEffect(async () => {
  const { wallet } = window;
  if (wallet === undefined) throw new Error('Missing External Wallet Extension');

  const { account } = wallet;
  let extensionState: InfiniteExtensionState;

  // Check if the user is already loged in and return data if so
  if (account !== null && !isError(account)) {
    extensionState = { walletLocked: false, logedIn: true, current: account };
    return extensionState;
  }

  const updateAccount = await wallet.login(variables.hederaNetwork as string);

  extensionState = {
    logedIn: updateAccount !== null,
    current: updateAccount !== null ? (updateAccount as AccountData) : undefined,
  };

  return extensionState;
});

// Effect to handle wallet logout request
export const InfiniteExtensionLogoutFx = createEffect(async () => {
  const { wallet } = window;
  if (wallet === undefined) throw new Error('Missing External Wallet Extension');

  const logoutResponse = await wallet.logout();
  if (logoutResponse === false) throw new Error('Logout attempt was unsuccessful.');

  const extensionState: InfiniteExtensionState = {
    logedIn: false,
    current: undefined,
  };

  return extensionState;
});

// Handle error feedback when loading wallet on component mount
InfiniteExtensionLoadFx.fail.watch((payload) => {
  // Prevent error feedback of missing window object due to SSR
  if (browser) {
    toast.danger(payload?.error?.message);
  }
});
// Handle feedback for login attempts
InfiniteExtensionLoginFx.fail.watch(({ error }) => {
  if (error['type'] === 'locked') {
    toast.danger(
      'Your INFINITE browser wallet seems to be locked. Please open your INFINITE Wallet browser extension and unlock your wallet.'
    );
  } else if (error['type'] === 'no_account') {
    toast.danger(
      `No account found in INFINITE Wallet browser extension for this network (${variables.hederaNetwork}).`
    );
  } else {
    toast.danger('INFINITE Wallet browser extension not installed.');
  }
});
InfiniteExtensionLoginFx.done.watch(({ result }) => {
  toast.success(`Successfully connected to INFINITE Wallet browser extension with address: ${result.current.id}`);
});

// Handle feedback for logout attempts
InfiniteExtensionLogoutFx.fail.watch(({ error }) => {
  if (error['type'] === 'locked') {
    toast.danger(
      'Your INFINITE browser wallet seems to be locked. Please open your INFINITE Wallet browser extension and unlock your wallet.'
    );
  } else {
    toast.danger(error.message);
  }
});
InfiniteExtensionLogoutFx.done.watch(() => {
  toast.success(`Successfully disconnected from INFINITE Wallet browser extension.`);
});

// Store for wallet extension state
export const InfiniteExtensionStore = createStore<InfiniteExtensionState>({
  extensionAvailable: undefined,
  walletLocked: undefined,
  logedIn: undefined,
  current: undefined,
})
  .on(
    [InfiniteExtensionLoadFx.doneData, InfiniteExtensionLoginFx.doneData, InfiniteExtensionLogoutFx.doneData],
    (state, payload) => ({
      ...state,
      ...payload,
    })
  )
  .on(InfiniteExtensionLoginFx.failData, (state, error) => {
    // If wallet is locked update store data
    if (error['type'] === 'locked') return { ...state, walletLocked: true };
  })
  .on(InfiniteExtensionLogoutFx.failData, (state, error) => {
    if (error['type'] === 'locked') return { ...state, walletLocked: true };
  });
