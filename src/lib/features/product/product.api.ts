import type { Product, Transaction, ListingSalePayload } from '$lib/sku-item/types';
import type { EthMintTransaction, ProductPayloadV2 } from './types';
import { get, patch, post, getPage, fetchTracker } from '$lib/api';

export const loadingTransactions = fetchTracker();

export async function loadProduct({ id, fetch }: { id: string; fetch?: Fetch }): Promise<Product> {
  return await get<Product>(`products/${id}?includeFunctions=true`, { fetch });
}

export async function createSale({ listing, fetch }: { listing: ListingSalePayload; fetch?: Fetch }) {
  return await post<ListingSalePayload>(`listings`, listing, { fetch });
}

export async function cancelSale({ id }: { id: string }) {
  return await patch(`listings/${id}/cancel`, {});
}

export async function claimMint({
  id,
  mintToAddress,
}: {
  id: string;
  mintToAddress: string;
}): Promise<EthMintTransaction> {
  return await post(`products/${id}/claim-mint`, { mintToAddress });
}

export async function loadProductTransactions({
  id,
  page,
  fetch,
}: {
  id: string;
  page: number;
  createdAt?: string;
  fetch?: Fetch;
}): Promise<{ total: number; data: Transaction[] }> {
  try {
    const { total, data } = await getPage<Transaction>(`products/${id}/transactions`, {
      params: { page: `${page}`, per_page: '5' },
      tracker: loadingTransactions,
      fetch,
    });

    // Always move `nft_minted` first, if exists (max 1 transaction with this type)
    const nftMintIndex = data.findIndex((transaction) => transaction.type === 'nft_mint');

    return {
      total,
      data:
        nftMintIndex > -1
          ? [...data.slice(0, nftMintIndex), ...data.slice(nftMintIndex + 1), data[nftMintIndex]]
          : data,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export async function getProductPaymentIntent(paymentIntent: string) {
  return await get<Product>(`products/${paymentIntent}/by-payment-intent_id`, {});
}

export async function getProductTxHash(txHash: string) {
  return await get<Product>(`products/${txHash}/by-transaction-hash`, {});
}

export async function getProductsV2(parameters: { [key: string]: string }): Promise<ProductPayloadV2> {
  return await get<ProductPayloadV2>('/v2/products', {
    params: parameters,
  });
}
