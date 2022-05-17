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
  import Agreement from '$lib/features/checkout/Agreement.svelte';
  import { toast } from '$ui/toast';
  import { variables } from '$lib/variables';
  import { stripeCreatePaymentIntentFx } from './stripe.store';
  import { handleCheckoutStateChange, showLoginToast } from '../checkout/checkout.service';
  import Information from '../checkout/Information.svelte';
  import { errorTypes } from './stripe.utils';
  import PendingCheckoutPage from '../checkout/PendingCheckoutPage.svelte';

  const voucherCode = $page.url.searchParams.get('voucherCode');
  const stripePromise = loadStripe(variables.stripe.pubKey as string);
  const STRIPE_PENDING_TIMEOUT = 300_000;

  export let listing: Listing;
  export let mintToAddress: string | undefined;
  export let lazyMinting: boolean;
  export let conversionRate: number | undefined = undefined;

  let acceptedTerms = false;
  let showPendingPage = false;
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

  const intervalToShowPendingPage = () =>
    setTimeout(() => {
      showPendingPage = true;
    }, STRIPE_PENDING_TIMEOUT);

  const stopIntervalToShowPendingPage = () => clearTimeout(intervalToShowPendingPage());

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
        whitelistCode: voucherCode,
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
      handleCheckoutStateChange('method-select');
    }
  }

  const handleRedirect = (): string => {
    intervalToShowPendingPage();
    return $page.url.toString();
  };

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
        return_url: handleRedirect(),
      },
    });
    !error && stopIntervalToShowPendingPage();
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    toast.clear();
    if (errorTypes.includes(error.type)) {
      toast.danger(error.message);
    } else {
      toast.danger('An unexpected error occured.');
    }

    isLoading = false;
  }

  const onCheckedTerms = (event: Event) => {
    acceptedTerms = (event.target as HTMLInputElement).checked;
  };
</script>

<!-- Display a payment form -->
<form id="payment-form" on:submit|preventDefault={handleSubmit}>
  <div id="payment-element" class:hidden={isLoading} bind:this={paymentElementNode}>
    <!--Stripe.js injects the Payment Element-->
  </div>
  {#if isLoading}
    <div class="flex justify-center">
      {#if showPendingPage}
        <PendingCheckoutPage />
      {:else}
        <DualRingLoader />
      {/if}
    </div>
  {:else}
    <div class="mt-10">
      <Information {conversionRate} />
    </div>
    <Agreement {acceptedTerms} {onCheckedTerms} />
    <div class="grid mt-8 grid-flow-row sm:grid-flow-col">
      <Button
        variant="outline-brand"
        class="sm:order-1 order-2 mr-0 mt-2 sm:mt-0 sm:mr-3"
        on:click={() => handleCheckoutStateChange('method-select')}
      >
        Back to Payment Method
      </Button>
      <Button variant="brand" class="sm:order-2 order-1" type="submit" disabled={isLoading || !acceptedTerms}>
        Buy Now for {totalCost}
      </Button>
    </div>
  {/if}
</form>
