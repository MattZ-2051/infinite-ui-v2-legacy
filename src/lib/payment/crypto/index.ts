import type { Writable } from 'svelte/store';
import type { CryptoAddress, CryptoKind } from './types';

import { get } from '$lib/api';
import { variables } from '$lib/variables';
import { waitForTx as etherscanWaitForTx } from './etherscan';
import { waitForTx as blockcypherWaitForTx } from './blockcypher';

export async function generateCryptoAddress(kind: CryptoKind): Promise<CryptoAddress> {
  return await get<CryptoAddress>(`wallet/${kind}/address`);
}

export function getCryptoAddressWaiter(
  kind: CryptoKind
): (
  address: string,
  txLinkStore: Writable<string>,
  timeoutStore: Writable<ReturnType<typeof setTimeout>>
) => Promise<void> {
  let waiter: typeof etherscanWaitForTx | typeof blockcypherWaitForTx;
  let requestFilters;
  let responseFilter;

  switch (kind) {
    case 'usdc':
      waiter = etherscanWaitForTx;
      requestFilters = { action: 'tokentx' };
      // eslint-disable-next-line unicorn/consistent-function-scoping
      responseFilter = (txResponse) => txResponse.contractAddress === variables.ethNetwork.usdcContractAddress;
      break;
    case 'eth':
      waiter = etherscanWaitForTx;
      requestFilters = { action: 'txlist' };
      break;
    case 'btc':
      waiter = blockcypherWaitForTx;
      break;
  }

  return async (address, txLinkStore, timeoutStore) =>
    await waiter({
      address,
      txLinkStore,
      timeoutStore,
      requestFilters,
      responseFilter,
    });
}

export function getExplorerBaseUrl(kind: CryptoKind) {
  switch (kind) {
    case 'usdc':
    case 'eth':
      return variables.ethNetwork.explorerBaseUrl;
    case 'btc':
      return variables.bitcoinNetwork.explorerBaseUrl;
  }
}

export function getChainName(kind: CryptoKind) {
  switch (kind) {
    case 'usdc':
    case 'eth':
      return 'Ethereum mainnet';
    case 'btc':
      return 'Bitcoin mainnet';
  }
}

export function getCoinName(kind: CryptoKind) {
  switch (kind) {
    case 'usdc':
      return 'USDC';
    case 'eth':
      return 'ETH';
    case 'btc':
      return 'BTC';
  }
}
