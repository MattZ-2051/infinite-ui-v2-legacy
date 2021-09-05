import type { Product } from '$lib/sku-item/types';
import type { ActionType } from './types';
import { openModal } from '$ui/modals';
import CreateSaleModal from '../CreateSaleModal.svelte';
import CancelSaleModal from '../CancelSaleModal.svelte';
import RedeemModal from '../redeem/RedeemModal.svelte';
import AuctionModal from '../auction/AuctionModal.svelte';
import CancelAuctionModal from '../auction/CancelAuctionModal.svelte';
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
      openModal(CancelAuctionModal, { listingId });
      break;
    }
    case 'create-sale': {
      openModal(CreateSaleModal, { product });
      break;
    }
    case 'cancel-sale': {
      openModal(CancelSaleModal, {
        listingId: product?.activeProductListings[0]?._id,
      });
      break;
    }
    case 'transfer': {
      openModal(ProductTransferModal, { product });
      break;
    }
  }
}
