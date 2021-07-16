import type { Sku, Product, Status } from '$lib/sku-item/types';

export const skuStatus = (sku: Sku): Status => {
  if (sku?.productListings?.length === 0 && sku?.skuListings?.length === 0) {
    return 'upcoming';
  }
  if (
    new Date(sku?.minStartDate) > new Date() &&
    (sku?.upcomingProductListings?.length !== 0 || sku?.upcomingSkuListings?.length !== 0)
  ) {
    return 'upcoming-soon';
  }
  if (sku?.totalSupplyLeft !== 0 && (sku.activeSkuListings?.length !== 0 || sku.activeProductListings?.length !== 0)) {
    return 'active';
  }
  if (sku?.totalSupplyLeft === 0 || sku.activeSkuListings?.length === 0) {
    return 'no-sale';
  }
};

export const productStatus = (product: Product): Status => {
  if (product?.activeProductListings.length === 0 && product?.upcomingProductListings.length === 0) {
    return 'no-sale';
  }
  if (product?.activeProductListings.length > 0) {
    return 'active';
  }
  return 'upcoming-soon';
};
