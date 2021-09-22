import type { Sku, Listing, CollectorProduct, Product } from '$lib/sku-item/types';

export type SupplyInfo = { type: 'unique' | 'limited' | 'released'; quantity: number } | undefined;

export const getActiveListings = (sku: Sku): Listing[] => {
  return sku.activeSkuListings.filter((skuListing) => !skuListing.canceled);
};

export const getUpcomingListings = (sku: Sku): Listing[] => {
  return sku.upcomingSkuListings.filter((skuListing) => !skuListing.canceled);
};

const isLimited = (sku: Sku): boolean => {
  return getActiveListings(sku).length === 0 && getUpcomingListings(sku).length === 0 && sku.totalSupply === 1;
};

export const getLimitedAuctionCollector = (sku: Sku, collectors: CollectorProduct[]): CollectorProduct | undefined => {
  if (
    isLimited(sku) &&
    collectors?.length > 0 &&
    collectors[0].listing?.saleType === 'auction' &&
    ['sold'].includes(collectors[0].listing.status)
  ) {
    return collectors[0];
  }
};

export const getLowestActiveListing = (collectors: CollectorProduct[]): CollectorProduct | undefined => {
  if (collectors.length === 0) return undefined;
  const collectorsWithListings = collectors?.filter((collector) => {
    const saleType = collector?.listing?.saleType;
    const status = collector?.listing?.status;
    return (saleType === 'auction' || saleType === 'fixed') && (status === 'upcoming' || status === 'active');
  });

  return collectorsWithListings?.length > 0
    ? collectorsWithListings?.reduce((previousListing, currentListing) => {
        return (previousListing?.listing?.price || previousListing?.listing?.minBid) <
          (currentListing?.listing?.price || currentListing?.listing?.minBid)
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
    if (sku.circulatingSupply === 0) return undefined;
    return limitedEditionMessageSelector(sku.circulatingSupply);
  }

  if (isVariable) {
    return sku.minStartDate > new Date()
      ? { type: 'released', quantity: sku.totalUpcomingSupply }
      : { type: 'released', quantity: sku.circulatingSupply };
  }
};

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
  sku: Sku
): string | undefined => {
  switch (messageType) {
    case 'limited':
      return `Limited to ${quantity}`;
    case 'released':
      return sku.minStartDate > new Date() ? `${quantity} to be released` : `${quantity} released`;
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
      return `Limited to ${quantity}`;
    case 'released':
      return product.minStartDate > new Date() ? `${quantity} to be released` : `${quantity} released`;
    case 'unique':
      return '1 of 1';
  }
};
