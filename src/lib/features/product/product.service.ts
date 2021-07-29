import type { Product } from '$lib/sku-item/types';

export function isOwner(product: Product, userId: string): boolean {
  return userId && userId === product?.owner?._id;
}

export function hasListing(product: Product): boolean {
  return hasActiveListing(product) || hasUpcomingListing(product);
}

export function hasActiveListing(product: Product): boolean {
  return product?.activeProductListings?.length > 0;
}

export function hasUpcomingListing(product: Product): boolean {
  return product?.upcomingProductListings?.length > 0;
}

export function hasSale(product: Product): boolean {
  return hasActiveSale(product) || hasUpcomingSale(product);
}

export function hasActiveSale(product: Product): boolean {
  const saleType = product?.activeProductListings?.[0]?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasUpcomingSale(product: Product): boolean {
  const saleType = product?.upcomingProductListings?.[0]?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasAuction(product: Product): boolean {
  return hasActiveAuction(product) || hasUpcomingAuction(product);
}

export function hasActiveAuction(product: Product): boolean {
  return product?.activeProductListings?.[0]?.saleType === 'auction';
}

export function hasUpcomingAuction(product: Product): boolean {
  return product?.upcomingProductListings?.[0]?.saleType === 'auction';
}

export function canCreateSale(product: Product, userId: string) {
  return isOwner(product, userId) && !hasListing(product);
}

export function canCancelSale(product: Product, userId: string) {
  return (
    isOwner(product, userId) && hasActiveListing(product) && !hasUpcomingListing(product) && !hasActiveAuction(product)
  );
}

export function canStartAuction(product: Product, userId: string) {
  return canCreateSale(product, userId);
}

export function canCancelAuction(product: Product, userId: string, totalBids: number) {
  return isOwner(product, userId) && hasAuction(product) && (totalBids === 0 || !hasActiveAuction(product));
}

export function canRedeem(product: Product, userId: string) {
  return (
    isOwner(product, userId) && product.sku?.redeemable && product.redeemedStatus !== 'redeemed' && !hasListing(product)
  );
}

export function canBuy(product: Product, userId: string): boolean {
  return !isOwner(product, userId) && hasActiveSale(product);
}

export function hasNoSale(product: Product, userId: string): boolean {
  return !hasListing(product) && !isOwner(product, userId);
}

export function canTransfer(product: Product, userId: string): boolean {
  return isOwner(product, userId) && !hasAuction(product) && !hasSale(product);
}
