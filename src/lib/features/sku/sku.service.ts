import type { Sku, Listing, CollectorProduct, SupplyType } from '$lib/sku-item/types';

type SupplyInfo = { type: SupplyType; label: string } | undefined;
const UNIQUE_SUPPLY_INFO = { type: 'unique' as SupplyType, label: '1 of 1' };

const fixedSupplyInfo = (sku: Sku): SupplyInfo => {
  if (sku?.totalSupplyUpcoming > 0) {
    return { type: 'limited', label: `Limited to ${sku.totalSupplyUpcoming}` };
  }
  if (sku.totalSupply > 0) {
    return { type: 'limited', label: `Limited to ${sku.totalSupply}` };
  }
  if (sku?.skuListings?.length > 0 && sku?.expiredSkuListings?.length > 0) {
    if (sku?.circulatingSupply === 0) {
      return undefined;
    }
    return sku?.circulatingSupply === 1
      ? UNIQUE_SUPPLY_INFO
      : { type: 'limited', label: `Limited to ${sku.circulatingSupply}` };
  }
  return undefined;
};

const variableSupplyInfo = (sku: Sku): SupplyInfo => {
  if (sku.circulatingSupply > 0) {
    return { type: 'released', label: `${sku.circulatingSupply} released` };
  }
  if (sku.minStartDate > new Date()) {
    return { type: 'released', label: `${sku.totalSupplyUpcoming} to be released` };
  }
  return undefined;
};

export const getSupplyInfo = (sku: Sku): SupplyInfo => {
  if (sku?.maxSupply === 1) {
    return UNIQUE_SUPPLY_INFO;
  }
  if (sku?.supplyType === 'fixed') {
    return fixedSupplyInfo(sku);
  }
  return variableSupplyInfo(sku);
};

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
  return collectors?.reduce((previousListing, currentListing) => {
    return (previousListing?.listing?.price || previousListing?.listing?.minBid) <
      (currentListing?.listing?.price || currentListing?.listing?.minBid)
      ? previousListing
      : currentListing;
  });
};
