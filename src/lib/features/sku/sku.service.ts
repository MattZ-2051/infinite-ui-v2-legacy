import type { Sku, Listing, Product } from '$lib/sku-item/types';
import type { SkuV2, CollectorProductV2 } from '$lib/infinite-api-sdk/types';
import { formatInteger } from '$util/format';

export type SupplyInfo = { type: 'unique' | 'limited' | 'released'; quantity: number } | undefined;

export function isOwner(sku: Sku, userId: string): boolean {
  return userId && userId === sku?.issuer?._id;
}

export const getActiveListings = (sku: Sku): Listing[] => {
  return sku.activeSkuListings.filter((skuListing) => !skuListing.canceled);
};

export const getUpcomingListings = (sku: Sku): Listing[] => {
  return sku.upcomingSkuListings.filter((skuListing) => !skuListing.canceled);
};

const isLimited = (sku: Sku): boolean => {
  return getActiveListings(sku).length === 0 && getUpcomingListings(sku).length === 0 && sku.totalSupply === 1;
};

export const getLimitedAuctionCollector = (
  sku: Sku,
  collectors: CollectorProductV2[]
): CollectorProductV2 | undefined => {
  if (
    isLimited(sku) &&
    collectors?.length > 0 &&
    collectors[0].listing?.saleType === 'auction' &&
    ['sold'].includes(collectors[0].listing.status)
  ) {
    return collectors[0];
  }
};

export const getLowestProductListing = (sku: Sku): Listing | undefined => {
  // lowestProductListingPrice is lowest between:
  // minHighestBidProductListing, minBidAuctionsNoBidsProductListings and minPriceBuyNowProductListings

  if (sku?.lowestProductListingPrice === sku?.minHighestBidProductListing) {
    // Find listing where the highest bid is the same as lowestProductListingPrice
    return sku?.activeProductListings.find((listing) => listing?.highestBid?.bidAmt === sku?.lowestProductListingPrice);
  }
  if (sku?.lowestProductListingPrice === sku?.minBidAuctionsNoBidsProductListings) {
    // Find listing where the starting bid is the same as lowestProductListingPrice and has no other bids
    return sku?.activeProductListings.find(
      (listing) => listing?.minBid === sku?.lowestProductListingPrice && !listing?.highestBid
    );
  }
  if (sku?.lowestProductListingPrice === sku?.minPriceBuyNowProductListings) {
    // Find listing where the product price is the same as lowestProductListingPrice
    return sku?.activeProductListings.find((listing) => listing?.price === sku?.lowestProductListingPrice);
  }
};

export const getLowestUpcomingProductListing = (sku: Sku): Listing | undefined => {
  return sku?.upcomingProductListings.length > 0
    ? sku?.upcomingProductListings?.reduce((previousListing, currentListing) => {
        return (Math.max(previousListing?.highestBid?.bidAmt || 0, previousListing?.minBid || 0) ||
          previousListing?.price) <
          (Math.max(currentListing?.highestBid?.bidAmt || 0, currentListing?.minBid || 0) || currentListing?.price)
          ? previousListing
          : currentListing;
      })
    : undefined;
};

const limitedEditionMessageSelector = (quantity: number): SupplyInfo => {
  if (quantity === 1) return { type: 'unique', quantity: 1 };
  return limitedEditions(quantity);
};

const limitedEditions = (quantity: number): SupplyInfo => {
  return { type: 'limited', quantity: quantity };
};

// ToDo we should refactor this function once we have integrated the new enpoint for getting a tile (v2/sku/tile/{id})
export const createSkuMessageTypeForV2 = (sku: SkuV2): SupplyInfo => {
  if (!sku) {
    return;
  }

  const isFixed = sku.supplyType === 'fixed';
  const hasListings = sku?.tileMeta?.countSkuListings > 0;
  const hasExpiredListings = sku?.tileMeta?.totalExpiredSkuListingsSupply > 0;
  const isVariable = sku.supplyType === 'variable';
  if (sku.maxSupply === 1) return { type: 'unique', quantity: sku.maxSupply };

  if (isFixed && sku?.tileMeta?.totalUpcomingSkuListingsSupply > 0) {
    if (hasListings) return limitedEditions(sku?.tileMeta?.totalUpcomingSkuListingsSupply + sku?.tileMeta?.totalSupply);
    return limitedEditions(sku?.tileMeta?.totalUpcomingSkuListingsSupply);
  }

  if (isFixed && sku?.tileMeta?.totalSupply > 0) {
    if (hasListings) return limitedEditionMessageSelector(sku?.tileMeta?.totalSupply);
    return limitedEditions(sku?.tileMeta?.totalSupply);
  }

  if (isFixed && hasListings && hasExpiredListings) {
    if (sku?.circulatingSupply === 0) return undefined;
    return limitedEditionMessageSelector(sku?.circulatingSupply);
  }

  if (isFixed && !hasListings) {
    return limitedEditionMessageSelector(sku.maxSupply);
  }

  if (isVariable) {
    return sku?.minStartDate > new Date()
      ? { type: 'released', quantity: sku?.tileMeta?.totalUpcomingSkuListingsSupply }
      : { type: 'released', quantity: sku?.circulatingSupply };
  }
};

// ToDo we should refactor this function once we have integrated the new enpoint for getting a tile (v2/sku/tile/{id})
export const createSkuMessageType = (sku: Sku): SupplyInfo => {
  if (!sku) {
    return;
  }

  const isFixed = sku.supplyType === 'fixed';
  const hasListings = sku.skuListings?.length > 0;
  const hasExpiredListings = sku.expiredSkuListings?.length > 0;
  const isVariable = sku.supplyType === 'variable';
  if (sku.maxSupply === 1) return { type: 'unique', quantity: sku.maxSupply };

  if (isFixed && sku.totalUpcomingSupply > 0) {
    if (hasListings) return limitedEditions(sku.totalUpcomingSupply + sku.totalSupply);
    return limitedEditions(sku.totalUpcomingSupply);
  }

  if (isFixed && sku.totalSupply > 0) {
    if (hasListings) return limitedEditionMessageSelector(sku.totalSupply);
    return limitedEditions(sku.totalSupply);
  }

  if (isFixed && hasListings && hasExpiredListings) {
    if (sku?.circulatingSupply === 0) return undefined;
    return limitedEditionMessageSelector(sku?.circulatingSupply);
  }

  if (isFixed && !hasListings) {
    return limitedEditionMessageSelector(sku.maxSupply);
  }

  if (isVariable) {
    return sku?.minStartDate > new Date()
      ? { type: 'released', quantity: sku.totalUpcomingSupply }
      : { type: 'released', quantity: sku?.circulatingSupply };
  }
};

// ToDo we should refactor this function once we have integrated the new enpoint for getting a tile (v2/sku/tile/{id})
export const createProductMessageType = (product: Product): SupplyInfo => {
  if (!product) {
    return;
  }

  const sku = product.sku;
  const isFixed = sku?.supplyType === 'fixed';
  const hasListings = product.skuListings?.length > 0;
  const hasExpiredListings = product.expiredSkuListings?.length > 0;
  const isVariable = sku?.supplyType === 'variable';
  if (sku?.maxSupply === 1) return { type: 'unique', quantity: sku?.maxSupply };

  if (isFixed && product.totalUpcomingSupply > 0) {
    if (hasListings) return limitedEditions(product.totalUpcomingSupply + product.totalSupply);
    return limitedEditions(product.totalUpcomingSupply);
  }

  if (isFixed && product.totalSupply > 0) {
    if (hasListings) return limitedEditionMessageSelector(product.totalSupply);
    return limitedEditions(product.totalSupply);
  }

  if (isFixed && hasListings && hasExpiredListings) {
    if (product.circulatingSupply === 0) return undefined;
    return limitedEditionMessageSelector(product.circulatingSupply);
  }

  if (isVariable) {
    if (product.circulatingSupply > 0) return { type: 'released', quantity: product.circulatingSupply };
    if (product.minStartDate > new Date()) {
      return { type: 'released', quantity: product.totalUpcomingSupply };
    }
  }
};

export const createSkuMessage = (
  messageType: SupplyInfo['type'],
  quantity: SupplyInfo['quantity'],
  sku: Sku | SkuV2
): string | undefined => {
  switch (messageType) {
    case 'limited':
      return `Limited to ${formatInteger(quantity)}`;
    case 'released':
      return sku?.minStartDate > new Date()
        ? `${formatInteger(quantity)} to be released`
        : `${formatInteger(quantity)} released`;
    case 'unique':
      return '1 of 1';
  }
};

export const createProductMessage = (
  messageType: SupplyInfo['type'],
  quantity: SupplyInfo['quantity'],
  product: Product
): string | undefined => {
  switch (messageType) {
    case 'limited':
      return `Limited to ${formatInteger(quantity)}`;
    case 'released':
      return product.minStartDate > new Date()
        ? `${formatInteger(quantity)} to be released`
        : `${formatInteger(quantity)} released`;
    case 'unique':
      return '1 of 1';
  }
};
