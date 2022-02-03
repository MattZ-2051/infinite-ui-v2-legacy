import {
  isOwner,
  hasListing,
  hasActiveListing,
  hasUpcomingListing,
  hasActiveSale,
  hasUpcomingSale,
  hasAuction,
  hasActiveAuction,
  hasUpcomingAuction,
  canCreateSale,
  canCancelSale,
  canStartAuction,
  canCancelAuction,
  canRedeem,
  canBuy,
  hasNoSale,
  inExternalBalance,
  transferredOut,
} from './product.service';
import { TestProduct } from './test/product-utils';

describe('product service', () => {
  it('the user is the owner of the product', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(isOwner(product, user)).toBe(true);
  });

  it('the user is not the owner of the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(isOwner(product, user)).toBe(false);
  });

  it('the product does not have listings', () => {
    const { product } = new TestProduct();
    expect(hasListing(product)).toBe(false);
  });

  it('the product has listings when it has active listings', () => {
    const { product } = new TestProduct().withActiveListings();
    expect(hasListing(product)).toBe(true);
  });

  it('the product has listings when it has upcoming listing', () => {
    const { product } = new TestProduct().withUpcomingListings();
    expect(hasListing(product)).toBe(true);
  });

  it('the product has active listings', () => {
    const { product } = new TestProduct().withActiveListings();
    expect(hasActiveListing(product)).toBe(true);
  });

  it('the product does not have active listings', () => {
    const { product } = new TestProduct();
    expect(hasActiveListing(product)).toBe(false);
  });

  it('the product has upcoming listings', () => {
    const { product } = new TestProduct().withUpcomingListings();
    expect(hasUpcomingListing(product)).toBe(true);
  });

  it('the product does not have upcoming listings', () => {
    const { product } = new TestProduct();
    expect(hasUpcomingListing(product)).toBe(false);
  });

  it('the product has active sale', () => {
    const { product } = new TestProduct().withActiveListings();
    expect(hasActiveSale(product)).toBe(true);
  });

  it('the product does not have active sale when there are no active listings', () => {
    const { product } = new TestProduct();
    expect(hasActiveSale(product)).toBe(false);
  });

  it('the product does not have active sale when there is an active auction', () => {
    const { product } = new TestProduct().withActiveAuctions();
    expect(hasActiveSale(product)).toBe(false);
  });

  it('the product has upcoming sale', () => {
    const { product } = new TestProduct().withUpcomingListings();
    expect(hasUpcomingSale(product)).toBe(true);
  });

  it('the product does not have upcoming sale when there are no upcoming listings', () => {
    const { product } = new TestProduct();
    expect(hasUpcomingSale(product)).toBe(false);
  });

  it('the product does not have upcoming sale when there is an active auction', () => {
    const { product } = new TestProduct().withUpcomingAuctions();
    expect(hasUpcomingSale(product)).toBe(false);
  });

  it('the product does not have auction when there are no product listings', () => {
    const { product } = new TestProduct();
    expect(hasAuction(product)).toBe(false);
  });

  it('the product does not have auction when the sale type is not auction', () => {
    const { product } = new TestProduct().withActiveListings();
    expect(hasAuction(product)).toBe(false);
  });

  it('the product has auction when it has active auction', () => {
    const { product } = new TestProduct().withActiveAuctions();
    expect(hasAuction(product)).toBe(true);
  });

  it('the product has auction when it has upcoming auction', () => {
    const { product } = new TestProduct().withUpcomingAuctions();
    expect(hasAuction(product)).toBe(true);
  });

  it('the product has active auction', () => {
    const { product } = new TestProduct().withActiveAuctions();
    expect(hasActiveAuction(product)).toBe(true);
  });

  it('the product does not have active auction', () => {
    const { product } = new TestProduct();
    expect(hasActiveAuction(product)).toBe(false);
  });

  it('the product has upcoming auction', () => {
    const { product } = new TestProduct().withUpcomingAuctions();
    expect(hasUpcomingAuction(product)).toBe(true);
  });

  it('the product does not have upcoming auction', () => {
    const { product } = new TestProduct();
    expect(hasUpcomingAuction(product)).toBe(false);
  });

  it('the user can create sale', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(canCreateSale(product, user)).toBe(true);
  });

  it('the user cannot create sale because he does not own the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(canCreateSale(product, user)).toBe(false);
  });

  it('the user cannot create sale because there are active listings', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveListings();
    expect(canCreateSale(product, user)).toBe(false);
  });

  it('the user can cancel sale', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveListings();
    expect(canCancelSale(product, user)).toBe(true);
  });

  it('the user cannot cancel sale because he does not own the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner().withActiveListings();
    expect(canCancelSale(product, user)).toBe(false);
  });

  it('the user cannot cancel sale because there are no active listings', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(canCancelSale(product, user)).toBe(false);
  });

  it('the user cannot cancel sale because there are upcoming listings', () => {
    const { product, user } = new TestProduct().withSameOwner().withUpcomingListings();
    expect(canCancelSale(product, user)).toBe(false);
  });

  it('the user cannot cancel sale because there are active auctions', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveAuctions();
    expect(canCancelSale(product, user)).toBe(false);
  });

  it('the user can start auction', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(canStartAuction(product, user)).toBe(true);
  });

  it('the user cannot start auction because he does not own the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(canStartAuction(product, user)).toBe(false);
  });

  it('the user cannot start auction because there are active listings', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveListings();
    expect(canStartAuction(product, user)).toBe(false);
  });

  it('the user can cancel auction when the auction is upcoming', () => {
    const { product, user } = new TestProduct().withSameOwner().withUpcomingAuctions();
    expect(canCancelAuction(product, user, 2)).toBe(true);
  });

  it('the user can cancel auction when it is active but has no bids', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveAuctions();
    expect(canCancelAuction(product, user, 0)).toBe(true);
  });

  it('the user cannot cancel the auction because he does not own the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner().withActiveAuctions();
    expect(canCancelAuction(product, user, 0)).toBe(false);
  });

  it('the user cannot cancel the auction because there are no auctions', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(canCancelAuction(product, user, 0)).toBe(false);
  });

  it('the user cannot cancel the auction because it is already active and there are bids', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveAuctions();
    expect(canCancelAuction(product, user, 2)).toBe(false);
  });

  it('the user can redeem the product', () => {
    const { product, user } = new TestProduct().withSameOwner().redeemable();
    expect(canRedeem(product, user)).toBe(true);
  });

  it('the user cannot redeem the product because he is not the owner', () => {
    const { product, user } = new TestProduct().withDifferentOwner().redeemable();
    expect(canRedeem(product, user)).toBe(false);
  });

  it('the user cannot redeem the product because it is not redeemable', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(canRedeem(product, user)).toBe(false);
  });

  it('the user cannot redeem the product because it is already redeemed', () => {
    const { product, user } = new TestProduct().withSameOwner().redeemable().redeemed();
    expect(canRedeem(product, user)).toBe(false);
  });

  it('the user cannot redeem the product because it has listings', () => {
    const { product, user } = new TestProduct().withSameOwner().redeemable().withActiveListings();
    expect(canRedeem(product, user)).toBe(false);
  });

  it('the user can buy the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner().withActiveListings();
    expect(canBuy(product, user)).toBe(true);
  });

  it('the user cannot buy the product because he is the owner', () => {
    const { product, user } = new TestProduct().withSameOwner().withActiveListings();
    expect(canBuy(product, user)).toBe(false);
  });

  it('the user cannot buy the product because there are no active sales', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(canBuy(product, user)).toBe(false);
  });

  it('the user sees no sale for the product', () => {
    const { product, user } = new TestProduct().withDifferentOwner();
    expect(hasNoSale(product, user)).toBe(true);
  });

  it('the user does not see no sale because he is the owner', () => {
    const { product, user } = new TestProduct().withSameOwner();
    expect(hasNoSale(product, user)).toBe(false);
  });

  it('the user does not see no sale because the product has listings', () => {
    const { product, user } = new TestProduct().withDifferentOwner().withActiveListings();
    expect(hasNoSale(product, user)).toBe(false);
  });

  it('the product is transferred out', () => {
    const { product, transactions } = new TestProduct().ownedByExternalWallet().withTransferOutTransaction();
    expect(transferredOut(product, transactions)).toBe(true);
  });

  it('the product transfer in is still pending', () => {
    const { product, transactions } = new TestProduct().ownedByExternalWallet().withTransferInPendingTransaction();
    expect(transferredOut(product, transactions)).toBe(true);
  });

  it('the product is in external wallet balance', () => {
    const { product, balance } = new TestProduct().inExternalWalletBalance();
    expect(inExternalBalance(product, balance)).toBe(true);
  });
});
