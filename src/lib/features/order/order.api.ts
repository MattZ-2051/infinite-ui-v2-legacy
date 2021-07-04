import type { SkuPurchaseTransaction } from './types';
import { patch } from '$lib/api';
import { loadTransactions } from '$lib/features/wallet/wallet.api';

export async function purchaseSkuListing(listingId: string): Promise<SkuPurchaseTransaction> {
  const response = await patch<SkuPurchaseTransaction>(`listings/${listingId}/purchase`, {});

  // TODO: ask to change API
  if (response.status === 'success') {
    const { transactions } = await loadTransactions(1);
    const currentTransaction = transactions.find((t) => t._id === response._id);

    if (currentTransaction) {
      response.product = currentTransaction.transactionData?.product?.[0];
    }
  }

  return response;
}
