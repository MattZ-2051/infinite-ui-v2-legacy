import type { Sku } from '$lib/sku-item/types';

export function getSellingFee(sku: Sku): number {
  return sku.sellerTransactionFeePercentage / 100 || 0;
}

export function getRoyaltyFee(sku: Sku): number {
  return sku.royaltyFeePercentage / 100;
}

export function getBiddingFee(sku: Sku): number {
  return sku.initialBuyersFeePercentage / 100 || 0;
}
