import type { Product, SaleType, Sku, Status } from '$lib/sku-item/types';
import dayjs from 'dayjs';

const getActiveTileTitle = (
  saleType: SaleType,
  product?: boolean,
  simpleTitle?: boolean,
  existsBids?: boolean
): string => {
  switch (saleType) {
    case 'giveaway':
      return simpleTitle ? 'Active Giveaway' : 'Active Giveaway:';
    case 'fixed':
      if (simpleTitle) return 'Active Sale';

      return product ? 'Selling For:' : 'Listing Price:';
    case 'auction':
      if (simpleTitle) return 'Active Auction';
      else return existsBids ? 'Latest Bid:' : 'Minimum bid:';
    default:
      return '';
  }
};
export const skuStatus = (sku: Sku, simpleTitle?: boolean): Status => {
  if (sku.activeSkuListings?.length !== 0 || sku.activeProductListings?.length !== 0) {
    const hasProductListings = !!sku.activeProductListings?.length;
    const hasSkuListings = !!sku.activeSkuListings?.length;
    const activeSkuSaleType = sku.activeSkuListings?.[0]?.saleType;
    const activeSku = sku.activeSkuListings?.[0];
    const lowestPriceListing = hasProductListings
      ? sku.activeProductListings?.reduce((previousListing, currentListing) => {
          const previousPrice = previousListing?.minBid || previousListing?.price;
          const currentPrice = currentListing?.minBid || currentListing?.price;
          return previousPrice < currentPrice ? previousListing : currentListing;
        })
      : undefined;
    const lowestPrice =
      lowestPriceListing?.saleType === 'auction'
        ? Math.max(lowestPriceListing?.minBid, lowestPriceListing?.minHighestBid || 0)
        : lowestPriceListing?.price;
    const lowestSkuPrice =
      activeSkuSaleType === 'auction' ? Math.max(activeSku.minBid, activeSku.minHighestBid || 0) : sku.minSkuPrice;

    const existsBid: boolean = lowestPriceListing
      ? lowestPriceListing.highestBid !== undefined
      : activeSku.highestBid !== undefined;
    const lowestPriceIsSkuListing = hasSkuListings && lowestPrice > lowestSkuPrice;

    let saleTypeTitle: string;
    let minPrice: number;
    if (activeSkuSaleType === 'giveaway') {
      minPrice = 0;
      saleTypeTitle = getActiveTileTitle(activeSkuSaleType, undefined, simpleTitle);
    } else {
      if (hasProductListings) {
        minPrice = hasSkuListings ? Math.min(lowestPrice, lowestSkuPrice) : lowestPrice;
        saleTypeTitle = lowestPriceIsSkuListing
          ? getActiveTileTitle(activeSkuSaleType, undefined, simpleTitle, existsBid)
          : getActiveTileTitle(lowestPriceListing.saleType, undefined, simpleTitle, existsBid);
      } else {
        minPrice = lowestSkuPrice;
        saleTypeTitle = getActiveTileTitle(activeSkuSaleType, undefined, simpleTitle, existsBid);
      }
    }
    return { status: 'active', minPrice, saleTypeTitle };
  }
  const minStartDate = sku.minStartDate;
  if (dayjs(minStartDate).isAfter(dayjs())) {
    if (dayjs(minStartDate).diff(new Date(), 'day', true) > 3) {
      return { status: 'upcoming', minStartDate };
    }
    if (sku.upcomingSkuListings?.length !== 0) {
      return { status: 'upcoming-soon', minStartDate };
    }
  }
  if (sku.upcomingProductListings?.length !== 0) {
    const lowestPriceUpcomingListing = sku.upcomingProductListings?.reduce((previousListing, currentListing) => {
      const previousPrice = previousListing?.minBid || previousListing?.price;
      const currentPrice = currentListing?.minBid || currentListing?.price;
      return previousPrice < currentPrice ? previousListing : currentListing;
    });
    const listingStartDate = lowestPriceUpcomingListing?.startDate;
    return dayjs(listingStartDate).diff(new Date(), 'day', true) > 3
      ? { status: 'upcoming', minStartDate: listingStartDate }
      : { status: 'upcoming-soon', minStartDate: listingStartDate };
  }
  if (sku.totalSupplyLeft === 0 || sku.activeSkuListings?.length === 0) {
    return { status: 'no-sale' };
  }
};

export const productStatus = (product: Product, simpleTitle?: boolean): Status => {
  const minStartDate = product?.listing?.startDate;
  if (dayjs(minStartDate).isAfter(dayjs())) {
    if (product.productListings?.length === 0 || dayjs(product.minStartDate).diff(new Date(), 'day', true) > 3) {
      return { status: 'upcoming', minStartDate };
    }
    if (product.upcomingProductListings?.length !== 0) {
      return { status: 'upcoming-soon', minStartDate };
    }
  }
  if (product?.totalSupplyLeft !== 0 && product?.activeProductListings?.length !== 0) {
    const productListing = product?.activeProductListings[0]; // change to use the active product listing instead of first listing (product.listing).
    const minPrice = productListing?.minBid ? productListing?.minBid : productListing?.price;
    const existsBid: boolean = productListing?.minBid !== productListing?.minHighestBid;

    const saleTypeTitle = getActiveTileTitle(productListing?.saleType, true, simpleTitle, existsBid);
    return { status: 'active', minPrice, saleTypeTitle };
  }
  if (product?.activeProductListings?.length === 0 && product?.upcomingProductListings?.length === 0) {
    return { status: 'no-sale' };
  }
};
