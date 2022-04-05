import type { CollectorProduct } from '$lib/sku-item/types';

export function isOwner(product: CollectorProduct, userId: string): boolean {
  return userId && userId === product?.owner?._id;
}

export function hasListing(product: CollectorProduct): boolean {
  return hasActiveListing(product) || hasUpcomingListing(product);
}

export function hasActiveListing(product: CollectorProduct): boolean {
  return !!product?.activeProductListing;
}

export function hasUpcomingListing(product: CollectorProduct): boolean {
  return !!product?.upcomingProductListing;
}

export function hasActiveSale(product: CollectorProduct): boolean {
  const saleType = product?.activeProductListing?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasUpcomingSale(product: CollectorProduct): boolean {
  const saleType = product?.upcomingProductListing?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasAuction(product: CollectorProduct): boolean {
  return hasActiveAuction(product) || hasUpcomingAuction(product);
}

export function hasActiveAuction(product: CollectorProduct): boolean {
  return product?.activeProductListing?.saleType === 'auction';
}

export function getActiveAuctionMinAllowedBid(product: CollectorProduct): number {
  const listing = product.activeProductListing;
  return listing.highestBid?.bidAmt ? listing.highestBid?.bidAmt + listing.auctionBidIncrement : listing.minBid;
}

export function hasUpcomingAuction(product: CollectorProduct): boolean {
  return product?.upcomingProductListing?.saleType === 'auction';
}
