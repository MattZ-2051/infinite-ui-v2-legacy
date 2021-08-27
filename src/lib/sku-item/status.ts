import type { Sku, Status } from '$lib/sku-item/types';
import dayjs from 'dayjs';

export const skuStatus = (sku: Sku): Status => {
  if (dayjs(sku?.minStartDate).isAfter(dayjs())) {
    if (
      (sku.productListings?.length === 0 && sku.skuListings?.length === 0) ||
      dayjs(sku.minStartDate).diff(new Date(), 'day', true) > 3
    ) {
      return 'upcoming';
    }
    if (sku?.upcomingProductListings?.length !== 0 || sku?.upcomingSkuListings?.length !== 0) {
      return 'upcoming-soon';
    }
  }
  if (sku.totalSupplyLeft !== 0 && (sku.activeSkuListings?.length !== 0 || sku.activeProductListings?.length !== 0)) {
    return 'active';
  }
  if (sku.totalSupplyLeft === 0 || sku.activeSkuListings?.length === 0) {
    return 'no-sale';
  }
};
