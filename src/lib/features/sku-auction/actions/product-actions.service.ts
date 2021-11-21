import type { Sku } from '$lib/sku-item/types';
import { openModal } from '$ui/modals';
import { loadWalletFx } from '$lib/features/wallet/wallet.store';
import BidModal from '../auction/BidModal.svelte';

export function onBid(amount: number, sku: Sku) {
  loadWalletFx();
  openModal(BidModal, {
    sku,
    amount,
  });
}
