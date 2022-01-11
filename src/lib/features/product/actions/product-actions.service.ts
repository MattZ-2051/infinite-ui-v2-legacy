import type { Product } from '$lib/sku-item/types';
import type { ActionType } from './types';
import { openModal } from '$ui/modals';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';
import { toast } from '$ui/toast';
import { cancelSale } from '$lib/features/product/product.api';
import { saleCancelled, auctionCancelled } from '$lib/features/product/product.store';
import { cancelAuction } from '$lib/features/product/auction/auction.api';
import routes from '$project/routes';
import { loadWalletFx } from '$lib/features/wallet/wallet.store';
import CreateSaleModal from '../CreateSaleModal.svelte';
import RedeemModal from '../redeem/RedeemModal.svelte';
import AuctionModal from '../auction/AuctionModal.svelte';
import BidModal from '../auction/BidModal.svelte';
import ProductTransferModal from '../transfer/ProductTransferModal.svelte';

export function onAction(type: ActionType, product: Product) {
  switch (type) {
    case 'redeem': {
      openModal(RedeemModal, { product });
      break;
    }
    case 'auction': {
      openModal(AuctionModal, { product });
      break;
    }
    case 'cancel-auction': {
      const listingId = (product.upcomingProductListings[0] || product.activeProductListings[0])._id;
      openModal(ConfirmModal, {
        title: 'Cancel Auction!',
        message: 'This action will cancel your for sale listing for this NFT.',
        labels: { cancel: 'Go back', confirm: 'Yes' },
        onConfirm: async () => {
          try {
            await cancelAuction(listingId);
            toast.success('Your listing has successfully been canceled.');
            auctionCancelled({ listingId });
          } catch (error) {
            switch (error?.data?.appCode) {
              case 'CANCEL_AUCTION_WITH_PLACED_BIDS':
                toast.danger('Auctions cannot be canceled once bids have been placed.');
                break;
              default:
                toast.danger(
                  `Whoops! Something went wrong. Please try again or <a href=${routes.help} class="font-bold">contact us</a> if this issue continues.`
                );
            }
          }
        },
      });
      break;
    }
    case 'create-sale': {
      openModal(CreateSaleModal, { product });
      break;
    }
    case 'cancel-sale': {
      const listingId = product?.activeProductListings[0]?._id;
      openModal(ConfirmModal, {
        title: 'Cancel Sale!',
        message:
          'By confirming this action you will remove this item from the marketplace and will not be available for other users to buy.',
        labels: { cancel: 'Go back', confirm: 'Yes' },
        onConfirm: async () => {
          try {
            await cancelSale({ id: listingId });
            toast.success('Your listing has successfully been canceled.');
            saleCancelled({ listingId });
          } catch (error) {
            switch (error?.data?.appCode) {
              case 'LISTING_NOT_ACTIVE':
                toast.danger(
                  `Whoops! Can't cancel the listing because it is not active right now. Please reload the page.`
                );
                break;
              case 'LISTING_ALREADY_SOLD':
                toast.danger(`Whoops! Can't cancel the listing because it was already sold. Please reload the page.`);
                break;
              default:
                toast.danger(
                  `Whoops! Something went wrong. Please try again or <a href=${routes.help} class="font-bold">contact us</a> if this issue continues.`
                );
            }
          }
        },
      });
      break;
    }
    case 'transfer': {
      openModal(ProductTransferModal, { product });
      break;
    }
  }
}

export function onBid(amount: number, product: Product) {
  loadWalletFx();
  openModal(BidModal, {
    product,
    amount,
  });
}
