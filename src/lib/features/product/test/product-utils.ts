import type { Product, Listing, Sku } from '$lib/sku-item/types';

export class TestProduct {
  product: Product;
  user: string;

  constructor(product = {} as Product) {
    this.product = product;
  }

  withSameOwner() {
    this.user = '1';
    this.product = { ...this.product, owner: { _id: this.user } };
    return this;
  }
  withDifferentOwner() {
    this.user = '1';
    this.product = { ...this.product, owner: { _id: '2' } };
    return this;
  }
  withActiveListings() {
    this.product = { ...this.product, activeProductListings: [{ saleType: 'fixed' }] as Listing[] };
    return this;
  }
  withActiveAuctions() {
    this.product = { ...this.product, activeProductListings: [{ saleType: 'auction' }] as Listing[] };
    return this;
  }
  withUpcomingListings() {
    this.product = { ...this.product, upcomingProductListings: [{ saleType: 'fixed' }] as Listing[] };
    return this;
  }
  withUpcomingAuctions() {
    this.product = { ...this.product, upcomingProductListings: [{ saleType: 'auction' }] as Listing[] };
    return this;
  }
  redeemable() {
    this.product = { ...this.product, sku: { redeemable: true } as Sku };
    return this;
  }
  redeemed() {
    this.product = { ...this.product, redeemedStatus: 'redeemed', sku: { redeemable: true } as Sku };
    return this;
  }
}
