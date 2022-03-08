import type { Product, Listing, Sku, Transaction } from '$lib/sku-item/types';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
import type { TokenId } from '@hashgraph/sdk';
import Long from 'long';

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
  ownedByExternalWallet() {
    this.product = { ...this.product, ownedByExternalWallet: true };
    return this;
  }
  withTransferOutTransaction() {
    return { ...this, transactions: [{ type: 'transfer_out' } as Transaction] };
  }
  withTransferInPendingTransaction() {
    return { ...this, transactions: [{ type: 'transfer_out', status: 'pending' } as Transaction] };
  }
  inExternalWalletBalance() {
    const token = { id: '0.0.12345', balance: 1 };

    this.product = { ...this.product, tokenId: token.id };
    const mockFunctions = {
      _map: undefined,
      __map: undefined,
      _fromString: undefined,
      _set: undefined,
    };
    const mockBalance: TokenBalanceMap & Map<TokenId | string, Long> = Object.assign(new Map(), mockFunctions);

    mockBalance.set(token.id, Long.fromNumber(token.balance));

    return { ...this, balance: mockBalance as TokenBalanceMap };
  }
}
