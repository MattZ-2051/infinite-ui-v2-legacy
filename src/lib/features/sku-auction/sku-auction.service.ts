import type { Sku } from '$lib/sku-item/types';

export function hasAuction(sku: Sku): boolean {
  return hasActiveAuction(sku) || hasUpcomingAuction(sku);
}

export function hasActiveAuction(sku: Sku): boolean {
  return sku?.activeSkuListings[0]?.saleType === 'auction';
}

export function hasUpcomingAuction(sku: Sku): boolean {
  return sku?.upcomingProductListings?.[0]?.saleType === 'auction';
}
