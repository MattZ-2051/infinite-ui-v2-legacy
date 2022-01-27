import type { SkuPurchaseTransaction, ValidETHListingData } from './types';
import { patch, post, get } from '$lib/api';
import { loadMyTransactions } from '$lib/features/wallet/wallet.api';

export async function purchaseSkuListing(listingId: string, mintToAddress?: string): Promise<SkuPurchaseTransaction> {
  const response = await patch<SkuPurchaseTransaction>(
    `listings/${listingId}/purchase`,
    mintToAddress ? { mintToAddress } : {}
  );

  return await processResponse(response);
}

export async function claimGiveawaySkuListing(listingId: string): Promise<void> {
  await post<SkuPurchaseTransaction>(`listings/${listingId}/claim-giveaway`, {});
}

async function processResponse(response: SkuPurchaseTransaction) {
  if (response.status === 'success') {
    const { transactions } = await loadMyTransactions({ page: 1 });
    const currentTransaction = transactions.find((t) => t._id === response._id);

    if (currentTransaction) {
      response.product = currentTransaction.transactionData?.product?.[0];
    }
  }

  return response;
}

export async function validETHdirectPurchase(listingId: string) {
  return await get<ValidETHListingData>(`listings/${listingId}/is-valid-direct-eth-purchase`, {});
}
