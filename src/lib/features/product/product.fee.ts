import type { Product, Sku } from '$lib/sku-item/types';

function isResale(product: Product) {
  return product.owner._id !== product.sku.issuer._id;
}

export function getSellingFee(product: Product): number {
  if (!product) {
    return 0;
  }

  if (isResale(product)) {
    return product.sku.sellerTransactionFeePercentageSecondary / 100 || 0;
  }

  return product.sku?.sellerTransactionFeePercentage / 100 || 0;
}

export function getRoyaltyFee(product: Product): number {
  if (!product) {
    return 0;
  }

  if (isResale(product)) {
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

  if (isResale(product)) {
    return product.resaleBuyersFeePercentage / 100;
  }

  return product.initialBuyersFeePercentage / 100;
}

export function getSkuBuyingFee(sku: Sku): number {
  return 'initialBuyersFeePercentage' in sku ? sku.initialBuyersFeePercentage / 100 : 0;
}
