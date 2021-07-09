import type { Product } from '$lib/sku-item/types';

export function hasAuction(product: Product): boolean {
  return isActiveAuction(product) || isUpcomingAuction(product);
}

export function isActiveAuction(product: Product): boolean {
  return product?.activeProductListings?.[0]?.saleType === 'auction';
}

export function isUpcomingAuction(product: Product): boolean {
  return product?.upcomingProductListings?.[0]?.saleType === 'auction';
}
