import type { Sku } from '$lib/sku-item/types';
import routes from '$project/routes';
import { loadWalletFx } from '$lib/features/wallet/wallet.store';
import { goto } from '$app/navigation';
import { updateCheckoutBidAmount } from '$lib/features/checkout/checkout.store';
import { handleCheckoutStateChange } from '$lib/features/checkout/checkout.service';

export function onBid(amount: number, sku: Sku) {
  loadWalletFx();
  goto(routes.checkoutSku(sku._id));
  updateCheckoutBidAmount(amount);
  handleCheckoutStateChange('ordering-balance');
}
