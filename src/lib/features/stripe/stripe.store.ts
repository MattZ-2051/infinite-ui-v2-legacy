import { createEffect } from 'effector';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from '$ui/toast';
import { variables } from '$lib/variables';
import { stripeCreatePaymentIntent } from './stripe.api';
import { pendingProductCreated, updateCheckoutState } from '../checkout/checkout.store';

const stripePromise = loadStripe(variables.stripe.pubKey as string);

interface VerifyStripeStatusFxProperties {
  clientSecret: string;
  oldCheckout?: boolean;
}

export const stripeCreatePaymentIntentFx = createEffect(
  async ({
    listingId,
    fetch,
    mintToAddress,
    whitelistCode,
  }: {
    listingId: string;
    fetch?: Fetch;
    mintToAddress?: string;
    whitelistCode?: string;
  }) => {
    return stripeCreatePaymentIntent({ listingId, fetch, mintToAddress, whitelistCode });
  }
);

// Fetches the payment intent status after payment submission
export const verifyStripeStatusFx = createEffect(
  async ({ clientSecret, oldCheckout }: VerifyStripeStatusFxProperties) => {
    const stripe = await stripePromise;

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded': {
        updateCheckoutState('processing');
        pendingProductCreated({ paymentIntent: paymentIntent.id, oldCheckout });
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
  }
);
