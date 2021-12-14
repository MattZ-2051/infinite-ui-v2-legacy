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
      else return existsBids ? 'Latest Bid:' : 'Minimum Bid:';
    default:
      return '';
  }
};

export const skuStatus = (sku: Sku, simpleTitle?: boolean): Status => {
  let saleTypeTitle: string;
  let minPrice: number;
  const minStartDate = sku?.minStartDate;
  if (sku?.forSaleListingsCounter > 0) {
    if (sku?.activeGiveawayListingsCounter > 0) {
      minPrice = 0;
      saleTypeTitle = getActiveTileTitle('giveaway', undefined, simpleTitle);
    } else {
      if (sku?.minPrice === sku?.lowestProductListingPrice) {
        minPrice = sku?.lowestProductListingPrice;
        if (sku?.lowestProductListingPrice === sku?.minHighestBidProductListing) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, true);
        }
        if (sku?.lowestProductListingPrice === sku?.minBidAuctionsNoBidsProductListings) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, false);
        }
        if (sku?.lowestProductListingPrice === sku?.minPriceBuyNowProductListings) {
          saleTypeTitle = getActiveTileTitle('fixed', undefined, simpleTitle);
        }
      }
      if (sku?.minPrice === sku?.lowestSkuListingPrice) {
        minPrice = sku?.lowestSkuListingPrice;
        if (sku?.lowestSkuListingPrice === sku?.minHighestBidSkuListing) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, true);
        }
        if (sku?.lowestSkuListingPrice === sku?.minBidAuctionsNoBidsSkuListings) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, false);
        }
        if (sku?.lowestSkuListingPrice === sku?.minPriceBuyNowSkuListings) {
          saleTypeTitle = getActiveTileTitle('fixed', undefined, simpleTitle);
        }
      }
    }

    return { status: 'active', minPrice, saleTypeTitle };
  }
  if (minStartDate !== undefined && dayjs(minStartDate).isAfter(dayjs())) {
    if (dayjs(minStartDate).diff(new Date(), 'day', true) > 3) {
      return { status: 'upcoming', minStartDate };
    }
    return { status: 'upcoming-soon', minStartDate };
  }
  return { status: 'no-sale' };
};

export const productStatus = (product: Product, simpleTitle?: boolean): Status => {
  const minStartDate = product.minStartDate;
  if (dayjs(minStartDate).isAfter(dayjs())) {
    if (product.productListings?.length === 0 || dayjs(minStartDate).diff(new Date(), 'day', true) > 3) {
      return { status: 'upcoming', minStartDate };
    }
    if (product.upcomingProductListings?.length !== 0) {
      return { status: 'upcoming-soon', minStartDate };
    }
  }

  if (product?.totalSupplyLeft !== 0 && product?.activeProductListings?.length !== 0) {
    const productListing = product?.activeProductListings[0]; // change to use the active product listing instead of first listing (product.listing).
    const minPrice = productListing?.minBid ? productListing?.minBid : productListing?.price;
    const existsBid: boolean = productListing?.minBid !== productListing?.minHighestBid?.bidAmt;
    const saleTypeTitle = getActiveTileTitle(productListing?.saleType, true, simpleTitle, existsBid);

    return { status: 'active', minPrice, saleTypeTitle };
  }

  if (product?.activeProductListings?.length === 0 && product?.upcomingProductListings?.length === 0) {
    return { status: 'no-sale' };
  }
};
