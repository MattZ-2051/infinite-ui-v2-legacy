import type { CollectorProductV2 } from '$lib/infinite-api-sdk/types';

export function isOwner(product: CollectorProductV2, userId: string): boolean {
  return userId && userId === product?.owner?._id;
}

export function hasListing(product: CollectorProductV2): boolean {
  return hasActiveListing(product) || hasUpcomingListing(product);
}

export function hasActiveListing(product: CollectorProductV2): boolean {
  return !!product?.activeProductListing;
}

export function hasUpcomingListing(product: CollectorProductV2): boolean {
  return !!product?.upcomingProductListing;
}

export function hasActiveSale(product: CollectorProductV2): boolean {
  const saleType = product?.activeProductListing?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasUpcomingSale(product: CollectorProductV2): boolean {
  const saleType = product?.upcomingProductListing?.saleType;
  return saleType && saleType !== 'auction';
}

export function hasAuction(product: CollectorProductV2): boolean {
  return hasActiveAuction(product) || hasUpcomingAuction(product);
}

export function hasActiveAuction(product: CollectorProductV2): boolean {
  return product?.activeProductListing?.saleType === 'auction';
}

export function getActiveAuctionMinAllowedBid(product: CollectorProductV2): number {
  const listing = product.activeProductListing;
  return listing.highestBid?.bidAmt ? listing.highestBid?.bidAmt + listing.auctionBidIncrement : listing.minBid;
}

export function hasUpcomingAuction(product: CollectorProductV2): boolean {
  return product?.upcomingProductListing?.saleType === 'auction';
}
