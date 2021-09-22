import type { TokenTxResponse, EtherscanResponse } from './types';
import type { CryptoAddressWaiterOptions } from '../types';

import { variables } from '$lib/variables';
import { get } from '$lib/api';

export async function waitForTx(waiterOptions: CryptoAddressWaiterOptions) {
  await _waitForTx(waiterOptions, await getCurrentBlock());
}

const apiUrl = `${variables.ethNetwork.apiUrl}/`;
const apiKey = variables.ethNetwork.apiKey;

async function getCurrentBlock() {
  const rr = await get<EtherscanResponse<string>>(apiUrl, {
    credentials: 'omit',
    params: {
      module: 'block',
      action: 'getblocknobytime',
      timestamp: Math.floor(Date.now() / 1000).toString(),
      closest: 'before',
      apikey: apiKey,
    },
  });

  if (rr.status === '0' && rr.message !== 'No transactions found') {
    throw new Error(rr.message);
  }

  return Number.parseInt(rr.result, 10);
}

async function getTxList(parameters: Record<string, string>) {
  const rr = await get<EtherscanResponse<TokenTxResponse[]>>(apiUrl, {
    credentials: 'omit',
    params: {
      sort: 'asc',
      ...parameters,
      module: 'account',
      apikey: apiKey,
    },
  });

  if (rr.status === '0' && rr.message !== 'No transactions found') {
    throw new Error(rr.message);
  }

  return rr.result;
}

async function _waitForTx(waiterOptions: CryptoAddressWaiterOptions, startBlock: number) {
  const requestFilters = waiterOptions.requestFilters || {};

  const txList = await getTxList({
    address: waiterOptions.address,
    startblock: startBlock.toString(),
    ...requestFilters,
  });

  const responseFilter = waiterOptions.responseFilter || (() => true);

  const filteredTxs = txList.filter(
    (txResponse) => responseFilter(txResponse) && Number.parseInt(txResponse.blockNumber) > startBlock
  );

  if (filteredTxs.length > 0) {
    waiterOptions.txLinkStore.set(filteredTxs[0].hash);
  } else {
    const timeout = setTimeout(async () => await _waitForTx(waiterOptions, startBlock), 5000);

    waiterOptions.timeoutStore.set(timeout);
  }
}
