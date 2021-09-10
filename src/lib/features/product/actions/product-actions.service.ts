import type { Product } from '$lib/sku-item/types';
import type { ActionType } from './types';
import { openModal } from '$ui/modals';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';
import { toast } from '$ui/toast';
import { cancelSale } from '$lib/features/product/product.api';
import { saleCancelled, auctionCancelled } from '$lib/features/product/product.store';
import { cancelAuction } from '$lib/features/product/auction/auction.api';
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
            toast.success('Your auction has been canceled.');
            auctionCancelled({ listingId });
          } catch {
            toast.danger(`Whoops, something went wrong - please try again.`);
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
            toast.success('Sale successfully cancelled.');
            saleCancelled({ listingId });
          } catch {
            toast.danger(`Whoops, something went wrong - please try again.`);
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
  openModal(BidModal, {
    product,
    amount,
  });
}
