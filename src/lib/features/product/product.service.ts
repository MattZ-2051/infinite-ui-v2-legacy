import type { Product, Transaction } from '$lib/sku-item/types';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';

export function isOwner(product: Product, userId: string): boolean {
  return userId && userId === product?.owner?._id;
}

export function hasListing(product: Product): boolean {
  return hasActiveListing(product) || hasUpcomingListing(product);
}

export function hasActiveListing(product: Product): boolean {
  return product?.activeProductListings?.length > 0;
}

export function hasUpcomingListing(product: Product): boolean {
  return product?.upcomingProductListings?.length > 0;
}

export function hasSale(product: Product): boolean {
  return hasActiveSale(product) || hasUpcomingSale(product);
}

export function hasActiveSale(product: Product): boolean {
  const saleType = product?.activeProductListings?.[0]?.saleType;
  return !!saleType && saleType !== 'auction';
}

export function hasUpcomingSale(product: Product): boolean {
  const saleType = product?.upcomingProductListings?.[0]?.saleType;
  return !!saleType && saleType !== 'auction';
}

export function hasAuction(product: Product): boolean {
  return hasActiveAuction(product) || hasUpcomingAuction(product);
}

export function hasActiveAuction(product: Product): boolean {
  return product?.activeProductListings?.[0]?.saleType === 'auction';
}

export function hasUpcomingAuction(product: Product): boolean {
  return product?.upcomingProductListings?.[0]?.saleType === 'auction';
}

export function canCreateSale(product: Product, userId: string) {
  return isOwner(product, userId) && !hasListing(product);
}

export function canCancelSale(product: Product, userId: string) {
  return (
    isOwner(product, userId) && hasActiveListing(product) && !hasUpcomingListing(product) && !hasActiveAuction(product)
  );
}

export function canStartAuction(product: Product, userId: string) {
  return canCreateSale(product, userId);
}

export function canCancelAuction(product: Product, userId: string, totalBids: number) {
  return isOwner(product, userId) && hasAuction(product) && (totalBids === 0 || !hasActiveAuction(product));
}

export function canRedeem(product: Product, userId: string) {
  return (
    isOwner(product, userId) && product.sku?.redeemable && product.redeemedStatus !== 'redeemed' && !hasListing(product)
  );
}

export function canBuy(product: Product, userId: string): boolean {
  return !isOwner(product, userId) && hasActiveSale(product);
}

export function hasNoSale(product: Product, userId: string): boolean {
  return !hasListing(product) && !isOwner(product, userId);
}

export function canTransfer(product: Product, userId: string): boolean {
  return isOwner(product, userId) && !hasAuction(product) && !hasSale(product);
}

export function transferredOut(product: Product, transactions: Transaction[]): boolean {
  return product.ownedByExternalWallet && transactions[0].type === 'transfer_out';
}

export function transferInPending(product: Product, transactions: Transaction[]): boolean {
  return (
    product.ownedByExternalWallet && transactions[0].type === 'transfer_in' && transactions[0].status === 'pending'
  );
}

export function inExternalBalance(product: Product, balance: TokenBalanceMap, nfts?: string[]) {
  if (!balance?.size) return false;
  const balanceData = JSON.parse(balance.toString());
  const hasBalance = +balanceData[product.tokenId] > 0;

  if (!hasBalance || !product.nftSerial) return hasBalance;

  return hasBalance && nfts?.includes(`${product.tokenId}@${product.nftSerial}`);
}
