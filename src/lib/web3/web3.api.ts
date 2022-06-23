import type { EtherscanResponse, TokenTxResponse } from '$lib/payment/crypto/etherscan/types';
import type { Product } from '$lib/sku-item/types';
import type { EthersContract } from './web3.types';
import { get } from '$lib/api';
import { variables } from '$lib/variables';
import { getProductsV2 } from '$lib/features/product/product.api';

const ethApiUrl = `${variables.ethNetwork.nftTransactionApiUrl}/`;
const apiKey = variables.ethNetwork.apiKey as string;

export async function getTotalSupply({ contractAddress }: EthersContract) {
  return await get<EtherscanResponse<string>>(ethApiUrl, {
    params: {
      module: 'stats',
      action: 'tokensupply',
      contractaddress: `${contractAddress}`,
      apikey: apiKey,
    },
  });
}

export async function getTokenTransactions({ contractAddress, userAddress }: EthersContract) {
  return await get<EtherscanResponse<TokenTxResponse>>(ethApiUrl, {
    params: {
      module: 'account',
      action: 'tokennfttx',
      contractaddress: `${contractAddress}`,
      apikey: apiKey,
      address: `${userAddress}`,
    },
  });
}

export async function getProductFromToken({
  serialNumber,
  mintingContractAddress,
}: {
  serialNumber: string;
  mintingContractAddress: string;
}): Promise<Product[]> {
  const result = await getProductsV2({
    serialNumber,
    mintingContractAddress: mintingContractAddress.toLocaleUpperCase(),
  });
  return result.resource;
}
