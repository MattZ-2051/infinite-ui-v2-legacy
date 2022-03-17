<script lang="ts">
  import { onMount } from 'svelte';
  import type { Listing } from '$lib/sku-item/types';
  import type { StripeElements, StripePaymentElement } from '@stripe/stripe-js';
  import { loadStripe } from '@stripe/stripe-js';
  import type { CurrencyType } from '../wallet/types';
  import { user } from '$lib/user';
  import { formatCurrency } from '$util/format';
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { toast } from '$ui/toast';
  import { variables } from '$lib/variables';
  import routes from '$project/routes';
  import { stripeCreatePaymentIntentFx } from './stripe.store';
  import { handleStateChange, showLoginToast } from '../checkout/checkout.service';

  const stripePromise = loadStripe(variables.stripe.pubKey as string);

  export let listing: Listing;
  export let mintToAddress: string | undefined;
  export let lazyMinting: boolean;

  let acceptedTerms = false;

  $: isLoading = false;

  let elements: StripeElements;
  let paymentElementNode: HTMLElement;

  let currency: CurrencyType;
  let totalCost: string;
  let sellerPrice: number;
  let buyerFee: number;
  let marketplaceFee: number;
  let gasFee: number;
  let rate: number;

  onMount(initialize);

  // Fetches a payment intent and captures the client secret
  async function initialize() {
    isLoading = true;

    const stripe = await stripePromise;
    try {
      const {
        client_secret: clientSecret,
        cost,
        networkFee,
        rate: rateUSD,
      } = await stripeCreatePaymentIntentFx({
        listingId: listing._id,
        mintToAddress,
        lazyMinting,
      });

      currency = cost.currency;
      sellerPrice = cost.finalPayout + cost.initialSellersFee;
      buyerFee = cost.initialBuyersFee;
      marketplaceFee = cost.initialBuyersFeePercentage / 100;
      gasFee = +networkFee.gas;
      rate = +rateUSD.amount;

      const total = sellerPrice + buyerFee + gasFee;
      totalCost = formatCurrency(total * rate, { currency: 'USD' });

      const style = getComputedStyle(paymentElementNode);
      const theme: 'flat' | 'stripe' | 'night' | 'none' = 'stripe';
      const appearance = {
        theme,
        variables: {
          colorBackground: style.backgroundColor,
          colorText: 'black',
          colorPrimary: style.getPropertyValue('--primary-color'),
        },
      };

      elements = await stripe.elements({ appearance, clientSecret });
      const paymentElement: StripePaymentElement = elements.create('payment');

      // Inject stripe iframe in selected element node
      paymentElement.mount(paymentElementNode);

      paymentElement.on('ready', () => (isLoading = false));
    } catch {
      handleStateChange('method-select');
    }
  }

  async function handleSubmit() {
    if (!user && lazyMinting) {
      showLoginToast();
    }
    if (!acceptedTerms) {
      toast.danger('Please agree to the Terms and Conditions in order to move forward.');
      return;
    }

    isLoading = true;

    const stripe = await stripePromise;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect to our payment completion page
        return_url: $page.url.toString(),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error.type === 'card_error' || error.type === 'validation_error') {
      toast.danger(error.message);
    } else {
      toast.danger('An unexpected error occured.');
    }

    isLoading = false;
  }
</script>

<!-- Display a payment form -->
<form id="payment-form" on:submit|preventDefault={handleSubmit}>
  <div id="payment-element" class:hidden={isLoading} bind:this={paymentElementNode}>
    <!--Stripe.js injects the Payment Element-->
  </div>
  {#if isLoading}
    <div class="flex justify-center">
      <DualRingLoader />
    </div>
  {:else}
    <div class="mt-10">
      <span class="text-sm text-gray-500"
        >All resales of this product are subject to a 5% royalty fee set by and to be paid to the original creator.</span
      >
    </div>
    <div class="flex items-center justify-start mt-2.5 mb-3">
      <label class="inline-flex items-center text-sm">
        <input type="checkbox" bind:checked={acceptedTerms} class="border-gray-400 border-2 text-black mr-2" />
        <span class="text-gray-500">I agree to the</span>
        <a href={routes.terms} class="ml-1" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
      </label>
    </div>
    <div class="grid mt-8 grid-flow-row sm:grid-flow-col">
      <Button
        variant="outline-brand"
        class="border-none sm:order-1 order-2 mr-0 mt-2 sm:mt-0 sm:mr-3"
        on:click={() => handleStateChange('method-select')}
      >
        Back to Payment Method
      </Button>
      <Button variant="brand" class="sm:order-2 order-1" type="submit" disabled={isLoading || !acceptedTerms}>
        Buy Now for {totalCost}
      </Button>
    </div>
  {/if}
</form>
