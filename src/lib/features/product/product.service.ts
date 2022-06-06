import type { TxStatus } from '$lib/payment/crypto/etherscan/types';
import type { Product, Transaction } from '$lib/sku-item/types';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
import type { StatusMintButton } from './mintButton/types';

export function getMintStatus(product: Product, txStatus: TxStatus | ''): StatusMintButton {
  const serialNumber = product.serialNumber;
  switch (product.status) {
    case 'minted':
      if (!serialNumber) return 'processing';
      return txStatus === 'pending' ? 'processing' : 'processed';
    case 'purchased':
      if (txStatus === 'pending') return 'processing';
      return 'toMint';
    case 'unsold':
      return 'unSold';
    default:
      return 'loading';
  }
}

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

export function transferInUnresolved(product: Product, transactions: Transaction[]): boolean {
  const { status } = transactions[0];
  return (
    product.ownedByExternalWallet &&
    transactions[0].type === 'transfer_in' &&
    (status === 'pending' || status === 'error')
  );
}

export function inExternalBalance(product: Product, balance: TokenBalanceMap, nfts?: string[]) {
  if (!balance?.size) return false;
  const hasBalance = balance.get(product.tokenId)?.toNumber() > 0;

  if (!hasBalance || !product.nftSerial) return hasBalance;

  return hasBalance && nfts?.includes(`${product.tokenId}@${product.nftSerial}`);
}
