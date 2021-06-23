import type {
  EtherscanActions,
  EtherscanResponse,
  EtherscanReturnType,
  USDCAddress,
} from './types';
import { variables } from '$lib/variables';
import { get } from '$lib/api';

const usdcApiUrl = variables.usdc.apiUrl;
const usdcApiKey = variables.usdc.apiKey;

export function generateUSDCAddress(): Promise<USDCAddress> {
  return get<USDCAddress>('wallet/usdc/address');
}

export function getCurrentBlock(): Promise<{ result: string }> {
  return get<{ result: string }>(usdcApiUrl, {
    params: {
      module: 'block',
      action: 'getblocknobytime',
      timestamp: Math.floor(Date.now() / 1000).toString(),
      closest: 'before',
      apikey: usdcApiKey,
    },
  });
}

export function getTxList<T extends EtherscanActions>({
  action,
  address,
  startBlock = '0',
  endBlock = '99999999',
  sort = 'asc',
}: {
  action: T;
  address: string;
  startBlock?: string;
  endBlock?: string;
  sort?: string;
}): Promise<EtherscanResponse<EtherscanReturnType<T>[]>> {
  return get<EtherscanResponse<EtherscanReturnType<T>[]>>(usdcApiUrl, {
    params: {
      module: 'account',
      action,
      address,
      startblock: startBlock,
      endblock: endBlock,
      sort,
      apikey: usdcApiKey,
    },
  });
}
