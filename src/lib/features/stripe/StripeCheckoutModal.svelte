<script lang="ts">
  // TODO: Delete file after moving USD NFT's to new checkout

  import Big from 'big.js';
  import { onMount } from 'svelte';
  import type { Listing } from '$lib/sku-item/types';
  import type { StripeElements, StripePaymentElement } from '@stripe/stripe-js';
  import { loadStripe } from '@stripe/stripe-js';
  import { formatCurrency } from '$util/format';
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { toast } from '$ui/toast';
  import { variables } from '$lib/variables';
  import routes from '$project/routes';
  import { stripeCreatePaymentIntentFx } from './stripe.store';
  import { errorTypes } from './stripe.utils';

  const stripePromise = loadStripe(variables.stripe.pubKey as string);

  export let listing: Listing;
  export let mintToAddress: string;
  let acceptedTerms = false;

  $: isLoading = false;

  let elements: StripeElements;
  let paymentElementNode: HTMLElement;

  let totalCost: string;

  onMount(initialize);

  // Fetches a payment intent and captures the client secret
  async function initialize() {
    isLoading = true;

    const stripe = await stripePromise;

    const {
      client_secret: clientSecret,
      cost,
      networkFee,
      rate: rateUSD,
    } = await stripeCreatePaymentIntentFx({
      listingId: listing._id,
      mintToAddress,
    });

    const total = new Big(cost.finalPayout).add(cost.serviceEarnings).add(networkFee.gas).times(rateUSD.amount);
    totalCost = formatCurrency(total.toFixed(2), { currency: 'USD' });

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
  }

  async function handleSubmit() {
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

    if (errorTypes.includes(error.type)) {
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
        <div>
          <p class="text-gray-500 inline">Read and agree to</p>
          <a href={routes.terms} class="text-black" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          <p class="text-gray-500 inline">and</p>
          <a href={routes.privacy} class="text-black" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
      </label>
    </div>
    <Button variant="brand" class="w-full mt-6" type="submit" disabled={isLoading || !acceptedTerms}
      >Buy Now for {totalCost}</Button
    >
  {/if}
</form>
