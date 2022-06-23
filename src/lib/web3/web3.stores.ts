import type { Product } from '$lib/sku-item/types';
import type { TokenTxResponse } from '$lib/payment/crypto/etherscan/types';
import { createEvent, createStore, createEffect, Event, Store } from 'effector';
import { createPolling } from '$util/effector';
import { fetchTenantContracts } from '$lib/tenant/settings.api';
import { getTokenTransfers, tokenToProduct } from './web3.service';

interface Poll {
  start: Event<void>;
  stop: Event<void>;
  $isActive: Store<boolean>;
}

interface Web3Store {
  ethAddress: string | undefined;
  products: Product[] | undefined;
  balance: string | undefined;
  walletConnected: boolean;
  poll?: Poll;
}

export const setEthAddress = createEvent<string | undefined>('addressUpdate');
export const setEthBalance = createEvent<string | undefined>('balanceUpdate');
export const fetchUserProducts = createEvent();
export const setWalletConnected = createEvent<boolean>('walletConnectionUpdate');
export const setUserProducts = createEvent<Product[] | undefined>('secondaryProductUpdate');
export const updateWeb3Store = createEvent<Web3Store>('web3StoreUpdate');
const failedApiCall = createEvent<void>(); //Event to add failed attempt
const resetFails = createEvent<void>(); //event to reset failed attempts.
const failedAttempts = createStore(0).on(failedApiCall, (numberOfAttempts) => {
  //store created to count the number of failed attempts to stop
  return numberOfAttempts + 1;
});
failedAttempts.on(resetFails, () => 0);

export const web3User = createStore<Web3Store>({
  ethAddress: undefined,
  products: undefined,
  balance: undefined,
  walletConnected: false,
})
  .on(setEthAddress, (previousState, ethAddress) => {
    return { ...previousState, ethAddress };
  })
  .on(setEthBalance, (previousState, balance) => {
    return { ...previousState, balance };
  })
  .on(setWalletConnected, (previousState, walletConnected) => {
    return { ...previousState, walletConnected };
  })
  .on(setUserProducts, (previousState, products) => {
    return { ...previousState, products };
  })
  .on(updateWeb3Store, (_, newState) => newState)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  .on(fetchUserProducts, (previousState, _) => {
    const products = web3User.getState().products;
    if (products?.length > 0) {
      web3User.getState().poll.stop();
    }
    const poll = createPolling(pollTokenInfoFx, 3000);
    resetFails();
    poll.start();
    return { ...previousState, poll };
  });

const pollTokenInfoFx = createEffect(async () => {
  const userAddress = web3User.getState().ethAddress;
  const contracts = await fetchTenantContracts();
  return await getTokenTransfers(contracts, userAddress);
});

const fetchProducts = createEffect(
  async ({ tokens, userAddress }: { tokens: TokenTxResponse[]; userAddress: string }): Promise<Product[]> => {
    return await tokenToProduct(tokens, userAddress);
  }
);

pollTokenInfoFx.fail.watch(() => {
  //in case the call gets an error re try at least 5 times.
  const poll = web3User.getState().poll;
  if (failedAttempts.getState() < 5) {
    poll.start();
  }
  failedApiCall();
});

pollTokenInfoFx.doneData.watch(async (tokens) => {
  const poll = web3User.getState().poll;
  poll.stop();
  const userAddress = web3User.getState().ethAddress;
  const products = await fetchProducts({ tokens: tokens.flat(), userAddress });
  setUserProducts(products.filter((product) => !!product));
});
