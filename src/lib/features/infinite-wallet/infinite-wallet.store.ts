import type {
  InfiniteExtension,
  InfiniteExtensionState,
  AccountData,
  AccountError,
  MirrorNodeNftResponse,
  MirrorNodeBalanceResponse,
} from './types';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
import { createEffect, createStore, forward } from 'effector';
import { browser } from '$app/env';
import { variables } from '$lib/variables';
import { toast } from '$ui/toast';
import { getMirrorTokenBalance, getNftBalance } from './mirror-node-api';
import { getTokenBalance } from './infinite-wallet.service';

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

// Effect to load wallet state on component mount
export const QueryBalanceLoadFx = createEffect(async (account: AccountData): Promise<TokenBalanceMap> => {
  if (account?.id) {
    const balance = await getTokenBalance(account);
    return balance;
  }
  // eslint-disable-next-line unicorn/no-null
  return null;
});

QueryBalanceLoadFx.fail.watch(() => toast.danger('There was an error loading wallet balance data from Hedera.'));

forward({ from: InfiniteExtensionStore.map((state) => state.current), to: QueryBalanceLoadFx });

// eslint-disable-next-line unicorn/no-null
export const QueryBalanceStore = createStore<TokenBalanceMap>(null).on(
  QueryBalanceLoadFx.doneData,
  (state, payload) => payload
);

export const MirrorNodeBalanceLoadFx = createEffect(
  async (account: AccountData): Promise<MirrorNodeBalanceResponse> => {
    if (account?.id) {
      const balance = await getMirrorTokenBalance({ walletId: account.id });

      return balance;
    }
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
);

MirrorNodeBalanceLoadFx.fail.watch(() =>
  toast.danger('There was an error loading Hedera wallet balance data from mirror node.')
);

forward({ from: InfiniteExtensionStore.map((state) => state.current), to: MirrorNodeBalanceLoadFx });

// eslint-disable-next-line unicorn/no-null
export const MirrorNodeBalanceDataStore = createStore<MirrorNodeBalanceResponse>(null).on(
  MirrorNodeBalanceLoadFx.doneData,
  (state, payload) => payload
);

export const SerialDataLoadFx = createEffect(async (): Promise<MirrorNodeNftResponse[]> => {
  let balance = {};
  let balanceData: MirrorNodeBalanceResponse;
  let accountId: string;
  let pending: boolean;
  MirrorNodeBalanceLoadFx.pending.watch((state) => (pending = state));
  QueryBalanceLoadFx.pending.watch((state) => (pending = pending && state));

  if (!pending) {
    MirrorNodeBalanceDataStore.watch((tokenData) => (balanceData = tokenData));
    QueryBalanceStore.watch((tokens) => {
      if (tokens?.toString()) balance = JSON.parse(tokens.toString());
    });
    InfiniteExtensionStore.watch((state) => (accountId = state?.current?.id));

    const nfts = balanceData?.tokens?.filter(
      (token) => +balance[token.token_id] > 0 && token.type.includes('NON_FUNGIBLE')
    );
    const serials = await getNftBalance({ nfts, walletId: accountId });

    return serials;
  }
});

forward({ from: [MirrorNodeBalanceLoadFx.done, QueryBalanceLoadFx.done], to: SerialDataLoadFx });

// eslint-disable-next-line unicorn/no-null
export const nftBalance = createStore<string[]>(null).on(SerialDataLoadFx.doneData, (state, payload) => {
  // eslint-disable-next-line unicorn/no-null
  if (!payload?.length) return null;

  return payload.reduce((collection, token) => {
    const ids = token.nfts.map((nft) => `${nft.token_id}@${nft.serial_number}`);
    return [...collection, ...ids];
  }, []);
});

// eslint-disable-next-line unicorn/no-null
export const tokenBalance = createStore<string[]>(null).on(
  [MirrorNodeBalanceLoadFx.doneData, QueryBalanceLoadFx.doneData],
  (state) => {
    let balance = {};
    let balanceData: MirrorNodeBalanceResponse;
    let pending: boolean;
    MirrorNodeBalanceLoadFx.pending.watch((fxState) => (pending = fxState));
    QueryBalanceLoadFx.pending.watch((fxState) => (pending = pending && fxState));

    if (!pending) {
      MirrorNodeBalanceDataStore.watch((tokenData) => (balanceData = tokenData));
      QueryBalanceStore.watch((tokens) => {
        if (tokens?.toString()) balance = JSON.parse(tokens.toString());
      });

      const tokens = balanceData?.tokens?.filter(
        (token) => +balance[token.token_id] > 0 && !token.type.includes('NON_FUNGIBLE')
      );
      return tokens.map((token) => token.token_id);
    }
    return state;
  }
);
