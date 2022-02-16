import { createEffect } from 'effector';
import { loadStripe } from '@stripe/stripe-js';
import type { Sku } from '$lib/sku-item/types';
import { toast } from '$ui/toast';
import { variables } from '$lib/variables';
import { openModal } from '$ui/modals';
import OrderModal from '$lib/features/order/OrderModal.svelte';
import { pendingBuyCreated } from '../product/product.store';
import { getActiveListings } from '../sku/sku.service';
import { connectStripeAccount, stripeCreatePaymentIntent } from './stripe.api';

const stripePromise = loadStripe(variables.stripe.pubKey as string);

interface VerifyStripeStatusFxProperties {
  clientSecret: string;
  sku: Sku;
}

export const connectStripeAccountFx = createEffect(
  async ({ refresh_url, return_url, fetch }: { refresh_url?: string; return_url?: string; fetch?: Fetch }) => {
    return connectStripeAccount({ refresh_url, return_url, fetch });
  }
);

export const stripeCreatePaymentIntentFx = createEffect(
  async ({ listingId, fetch, mintToAddress }: { listingId: string; fetch?: Fetch; mintToAddress: string }) => {
    return stripeCreatePaymentIntent({ listingId, fetch, mintToAddress });
  }
);

// Fetches the payment intent status after payment submission
export const verifyStripeStatusFx = createEffect(async ({ clientSecret, sku }: VerifyStripeStatusFxProperties) => {
  const stripe = await stripePromise;

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case 'succeeded': {
      const activeListings = getActiveListings(sku);
      toast.success('Payment succeeded!');
      pendingBuyCreated(sku._id);
      openModal(OrderModal, {
        sku,
        listing: activeListings[0],
        stripeSucceded: true,
      });
      break;
    }
    case 'processing':
      toast.info('Your payment is processing.');
      break;
    case 'requires_payment_method':
      toast.danger('Your payment was not successful, please try again.');
      break;
    default:
      toast.danger('Something went wrong.');
      break;
  }
});
