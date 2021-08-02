import type { Product } from '$lib/sku-item/types';

export function getSellingFee(product: Product): number {
  if (!product) {
    return 0;
  }

  if (product.resale) {
    return product.sku.sellerTransactionFeePercentageSecondary / 100;
  }

  return product.sku?.sellerTransactionFeePercentage / 100 || 0;
}

export function getRoyaltyFee(product: Product): number {
  if (!product) {
    return 0;
  }

  if (product.resale) {
    return product.sku.royaltyFeePercentage / 100;
  }

  return 0;
}

export function getBiddingFee(product: Product): number {
  if (!product) {
    return 0;
  }

  return product.initialBuyersFeePercentage / 100 || 0;
}

export function getBuyingFee(product: Product): number {
  if (!product) {
    return 0;
  }

  if (product.resale) {
    return product.resaleBuyersFeePercentage / 100;
  }

  return product.initialBuyersFeePercentage / 100;
}
