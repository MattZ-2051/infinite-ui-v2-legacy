import type { Product, SaleType, Sku, Status } from '$lib/sku-item/types';
import type { SkuV2 } from '$lib/infinite-api-sdk/types';
import dayjs from 'dayjs';

const getActiveTileTitle = (
  saleType: SaleType,
  product?: boolean,
  simpleTitle?: boolean,
  existsBids?: boolean,
  isUniqueListing?: boolean
): string => {
  switch (saleType) {
    case 'giveaway':
      return 'Active Giveaway:';
    case 'fixed':
      if (simpleTitle) return 'Active Sale';
      if (product) return 'Selling For:';
      return isUniqueListing ? 'Listing Price' : 'Lowest Listing Price:';
    case 'auction':
      if (simpleTitle) return 'Active Auction';
      if (!isUniqueListing) return 'Lowest bid';
      return existsBids ? 'Latest Bid:' : 'Minimum Bid:';
    default:
      return '';
  }
};

export const skuStatusForV2 = (sku: SkuV2, simpleTitle?: boolean): Status => {
  let saleTypeTitle: string;
  let minPrice: number;
  const minStartDate = sku?.minStartDate;

  const isOnlyBuyNowListing: boolean =
    sku?.tileMeta?.countActiveSkuListings + sku?.tileMeta?.countActiveProductListings === 1 &&
    sku?.minPriceListing?.saleType === 'fixed';
  const isUniqueAuction: boolean = sku?.tileMeta?.countActiveAuctionListings === 1;

  if (sku?.activeSkuListing || sku?.activeAuctionProductListing || sku?.activeBuyNowProductListing) {
    if (sku?.minPriceListing?.saleType === 'giveaway') {
      minPrice = 0;
      saleTypeTitle = getActiveTileTitle('giveaway', undefined, simpleTitle);
    } else {
      minPrice = sku?.minPriceListing?.minPriceOrBid;
      switch (sku.minPriceListing.saleType) {
        case 'auction':
          saleTypeTitle = getActiveTileTitle(
            sku.minPriceListing.saleType,
            undefined,
            simpleTitle,
            !!sku.minPriceListing.highestBid?._id,
            isUniqueAuction
          );
          break;
        case 'fixed':
          saleTypeTitle = getActiveTileTitle(
            sku.minPriceListing.saleType,
            undefined,
            simpleTitle,
            undefined,
            isOnlyBuyNowListing
          );
          break;
        default:
          saleTypeTitle = '';
          break;
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

export const skuStatus = (sku: Sku, simpleTitle?: boolean): Status => {
  let saleTypeTitle: string;
  let minPrice: number;
  const minStartDate = sku?.minStartDate;

  const isOnlyBuyNowListing: boolean =
    sku?.activeBuyNowSkuListingsCounter + sku?.activeBuyNowProductListingsCounter === 1 &&
    !sku?.activeGiveawayListingsCounter &&
    !sku?.activeAuctionSkuListingsCounter &&
    !sku?.activeAuctionProductListingsCounter;

  const isUniqueAuction: boolean =
    sku?.activeAuctionSkuListingsCounter + sku?.activeAuctionProductListingsCounter === 1;

  if (sku?.forSaleListingsCounter > 0) {
    if (sku?.activeGiveawayListingsCounter > 0) {
      minPrice = 0;
      saleTypeTitle = getActiveTileTitle('giveaway', undefined, simpleTitle);
    } else {
      if (sku?.minPrice === sku?.lowestProductListingPrice) {
        minPrice = sku?.lowestProductListingPrice;
        if (sku?.lowestProductListingPrice === sku?.minHighestBidProductListing) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, true, isUniqueAuction);
        }
        if (sku?.lowestProductListingPrice === sku?.minBidAuctionsNoBidsProductListings) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, false, isUniqueAuction);
        }
        if (sku?.lowestProductListingPrice === sku?.minPriceBuyNowProductListings) {
          saleTypeTitle = getActiveTileTitle('fixed', undefined, simpleTitle, undefined, isOnlyBuyNowListing);
        }
      }
      if (sku?.minPrice === sku?.lowestSkuListingPrice) {
        minPrice = sku?.lowestSkuListingPrice;
        if (sku?.lowestSkuListingPrice === sku?.minHighestBidSkuListing) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, true, isUniqueAuction);
        }
        if (sku?.lowestSkuListingPrice === sku?.minBidAuctionsNoBidsSkuListings) {
          saleTypeTitle = getActiveTileTitle('auction', undefined, simpleTitle, false, isUniqueAuction);
        }
        if (sku?.lowestSkuListingPrice === sku?.minPriceBuyNowSkuListings) {
          saleTypeTitle = getActiveTileTitle('fixed', undefined, simpleTitle, undefined, isOnlyBuyNowListing);
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
