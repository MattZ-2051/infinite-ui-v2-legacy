import type { Product, Sku, Status } from '$lib/sku-item/types';
import dayjs from 'dayjs';

export const skuStatus = (sku: Sku): Status => {
  const minStartDate = sku.minStartDate;
  if (dayjs(minStartDate).isAfter(dayjs())) {
    if (
      (sku.productListings?.length === 0 && sku.skuListings?.length === 0) ||
      dayjs(minStartDate).diff(new Date(), 'day', true) > 3
    ) {
      return { status: 'upcoming', minStartDate };
    }
    if (sku.upcomingProductListings?.length !== 0 || sku.upcomingSkuListings?.length !== 0) {
      return { status: 'upcoming-soon', minStartDate };
    }
  }
  if (sku.totalSupplyLeft !== 0 && (sku.activeSkuListings?.length !== 0 || sku.activeProductListings?.length !== 0)) {
    const hasProductListings = !!sku.activeProductListings?.length;
    const hasSkuListings = !!sku.activeSkuListings?.length;
    const isAuctionListing =
      sku.activeProductListings?.[0]?.saleType === 'auction' && sku.activeProductListings?.[0].status === 'active';
    let minPrice: number;

    if (hasProductListings) {
      if (hasSkuListings) {
        minPrice = isAuctionListing ? Math.min(sku.maxBid, sku.minSkuPrice) : Math.min(sku.minPrice, sku.minSkuPrice);
      } else {
        minPrice = isAuctionListing ? sku.maxBid : sku.minPrice;
      }
    } else {
      minPrice = sku.minSkuPrice;
    }

    return { status: 'active', minPrice };
  }
  if (sku.totalSupplyLeft === 0 || sku.activeSkuListings?.length === 0) {
    return { status: 'no-sale' };
  }
};

export const productStatus = (product: Product): Status => {
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
    const productListing = product?.listing;
    const minPrice = productListing?.minBid ? productListing?.minBid : productListing?.price;

    return { status: 'active', minPrice };
  }
  if (product?.activeProductListings?.length === 0 && product?.upcomingProductListings?.length === 0) {
    return { status: 'no-sale' };
  }
};
