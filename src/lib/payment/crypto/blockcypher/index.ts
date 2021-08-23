import type { AddressInfoResponse } from './types';
import type { CryptoAddressWaiterOptions } from '../types';

import { variables } from '$lib/variables';
import { get } from '$lib/api';

export async function waitForTx(waiterOptions: CryptoAddressWaiterOptions) {
  await _waitForTx(waiterOptions, await getCurrentBlock());
}

const apiUrl = variables.bitcoinNetwork.apiUrl;

async function getCurrentBlock(): Promise<number> {
  const rr = await get<{ height: number }>(apiUrl);
  return rr.height;
}

async function getTxList({ address, startBlock }: { address: string; startBlock: number }) {
  const rr = await get<AddressInfoResponse>(`${apiUrl}/addrs/${address}`, {
    params: {
      after: startBlock.toString(10),
      limit: Number(1).toString(10),
      omitWalletAddresses: true.toString(),
      includeScript: false.toString(),
    },
  });
  return [...(rr.txrefs || []), ...(rr.unconfirmed_txrefs || [])].map(({ block_height, ...more }) => ({
    ...more,
    block_height: block_height || 0,
  }));
}

async function _waitForTx(waiterOptions: CryptoAddressWaiterOptions, startBlock: number) {
  const txList = await getTxList({ address: waiterOptions.address, startBlock });

  const filteredTxs = waiterOptions.responseFilter
    ? txList.filter((element) => waiterOptions.responseFilter(element))
    : txList;

  if (filteredTxs.length > 0) {
    waiterOptions.txLinkStore.set(filteredTxs[0].tx_hash);
  } else {
    const timeout = setTimeout(async () => await _waitForTx(waiterOptions, startBlock), 5000);

    waiterOptions.timeoutStore.set(timeout);
  }
}
