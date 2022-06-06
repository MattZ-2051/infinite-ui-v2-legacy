import type { ListingCosts, ValidETHListingData, SkuPurchaseTransaction } from './types';
import { get, post, patch } from '$lib/api';
import { loadMyTransactions } from '$lib/features/wallet/wallet.api';

export async function validETHdirectPurchase(listingId: string) {
  return await get<ValidETHListingData>(`listings/${listingId}/is-valid-direct-eth-purchase`, {});
}

export async function getCosts(listingId: string) {
  return await get<ListingCosts>(`/listings/${listingId}/stripe/costs`, {});
}

export async function purchaseSkuListing(listingId: string, mintToAddress?: string): Promise<SkuPurchaseTransaction> {
  const response = await patch<SkuPurchaseTransaction>(
    `listings/${listingId}/purchase`,
    mintToAddress ? { mintToAddress } : {}
  );

  return await processResponse(response);
}

export async function claimGiveawaySkuListing(listingId: string): Promise<string> {
  const response = await post<SkuPurchaseTransaction>(`listings/${listingId}/claim-giveaway`, {});
  return response._id;
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
