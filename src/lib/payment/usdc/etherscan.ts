import type { Writable } from 'svelte/store';
import { variables } from '$lib/variables';
import { getCurrentBlock, getTxList } from './usdc.api';

const usdcAddress = variables.usdc.address;

export async function waitForTx(
  address: string,
  txLinkStore: Writable<string>,
  timeoutStore: Writable<ReturnType<typeof setTimeout>>,
  startBlock?: number
) {
  if (startBlock === undefined) {
    startBlock = Number.parseInt((await getCurrentBlock()).result);
  }

  const txList = await getTxList({
    action: 'tokentx',
    address,
    startBlock: startBlock.toString(),
    sort: 'dsc',
  });

  if (typeof txList.result === 'string') {
    // eslint-disable-next-line unicorn/prefer-type-error
    throw new Error(txList.result);
  }

  const usdcTxs = txList.result.filter(
    (txResponse) => txResponse.contractAddress === usdcAddress && Number.parseInt(txResponse.blockNumber) > startBlock
  );

  if (usdcTxs.length > 0) {
    txLinkStore.set(usdcTxs[0].hash);
  } else {
    const timeout = setTimeout(async () => await waitForTx(address, txLinkStore, timeoutStore, startBlock), 5000);

    timeoutStore.set(timeout);
  }
}
