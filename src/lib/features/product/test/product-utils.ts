import type { Product, Listing, Sku, Transaction } from '$lib/sku-item/types';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
import { TokenId } from '@hashgraph/sdk';
import Long from 'long';
//import ObjectMap from '@hashgraph/sdk/lib/ObjectMap';
// import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
//import AccountBalance from '@hashgraph/sdk/lib/account/AccountBalance';

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
  withDifferentExternalWalletId() {
    this.product = { ...this.product, externalWallet: '0.0.54321' };
    return { ...this, walletId: '0.0.12345' };
  }
  withTransferOutTransaction() {
    return { ...this, transactions: [{ type: 'transfer_out' } as Transaction] };
  }
  withTransferInPendingTransaction() {
    return { ...this, transactions: [{ type: 'transfer_out', status: 'pending' } as Transaction] };
  }
  inExternalWalletBalance() {
    const id = '0.0.12345';
    this.product = { ...this.product, tokenId: id };
    const mockFunctions = {
      toString: () => JSON.stringify({ [id]: '1' }),
      _map: undefined,
      __map: undefined,
      _fromString: undefined,
      _set: undefined,
    };
    const mockBalance: TokenBalanceMap & Map<TokenId, Long> = Object.assign(new Map(), mockFunctions);

    mockBalance.set(TokenId.fromString(id), Long.fromNumber(1));

    return { ...this, balance: mockBalance as TokenBalanceMap };
  }
}
