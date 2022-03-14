<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { mdiClose } from '@mdi/js';
  import type { Product, Sku } from '$lib/sku-item/types';
  import type { CheckoutState, ValidETHListingData } from './types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import { getWalletInfo, onSignIn, user } from '$lib/user';
  import metamaskIcon from '$lib/features/checkout/assets/metamask-icon';
  import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { media } from '$lib/media-query.store';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import routes from '$project/routes';
  import { toast } from '$ui/toast';
  import Icon from '$ui/icon/Icon.svelte';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';
  import PaymentButton from './PaymentButton.svelte';
  import ProcessingOrder from './ProcessingOrder.svelte';
  import OrderStatus from './OrderStatus.svelte';
  import CompletePurchaseMM from './CompletePurchaseMM.svelte';
  import { handlePayment, handleExit, handleStateChange } from './checkout.service';
  import { getCosts, validETHdirectPurchase } from './checkout.api';
  import { checkoutState } from './checkout.store';
  import StripeCheckout from '../stripe/StripeCheckout.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  const MM_WALLET_ENABLED = import.meta.env?.VITE_MM_WALLET_ENABLED === 'true';
  const STRIPE_ENABLED = import.meta.env?.VITE_STRIPE_ENABLED === 'true';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);
  const lazyMinting = sku?.mintPolicy?.transaction === 'later';
  const paymentMethods = [
    { id: 'cc', title: 'Credit Card', iconSource: creditCardIcon, available: MM_WALLET_ENABLED },
    { id: 'mm', title: 'MetaMask', iconSource: metamaskIcon, available: STRIPE_ENABLED },
  ];

  $: exitCheckout = $checkoutState === 'exit';
  $: processingOrder = $checkoutState === 'processing';
  $: orderSuccess = $checkoutState === 'success';
  $: orderError = $checkoutState === 'error';
  $: orderingMm = $checkoutState === 'ordering-mm';
  $: orderingStripe = $checkoutState === 'ordering-stripe';
  $: paymentSelection = $checkoutState === 'method-select';
  $: isLoading = $checkoutState === 'loading';
  $: isOrdering = $checkoutState.startsWith('ordering');

  $: isFullScreenComponent = orderSuccess || orderError;

  let gasFee: number;
  let rate: number;

  let validETHPurchase: ValidETHListingData;
  let ethAddress = undefined;

  onMount(async () => {
    if (!$user && sku?.mintPolicy?.transaction === 'later') {
      onSignIn();
      return;
    }
    const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');
    if (!clientSecret) {
      handleStateChange((localStorage.getItem('checkout-state') as CheckoutState) || 'method-select');
    }
    try {
      const costs = await getCosts(listing._id);

      gasFee = +costs.networkFee.gas;
      rate = +costs.rate.amount;

      validETHPurchase = await validETHdirectPurchase(listing._id);
    } catch {
      validETHPurchase = undefined;
      if (sku.currency === 'ETH') {
        toast.danger('Currently not available for purchase', { toastId: 'LISTING_UNAVAILABLE' });
        return;
      }
    }
  });

  onDestroy(async () => {
    localStorage.removeItem('checkout-state');
  });

  const handleEthModalCallback = async ({ address, option }: { address: string; option: string }): Promise<void> => {
    if (option === 'metamask') {
      const data = await getWalletInfo();
      ethAddress = data.address;
    } else if (option === 'manual') {
      ethAddress = address;
    }
    handleStateChange('ordering-stripe');
  };

  const handlePaymentButton = (id: string) => {
    handlePayment({ id, user: $user, handleEthModalCallback, skuMintPolicy: sku.mintPolicy });
  };

  $: gridContainerClass =
    ($media.xl || (!exitCheckout && !processingOrder)) && !isFullScreenComponent
      ? 'grid grid-flow-row xl:divide-x xl:divide-gray-200'
      : 'grid-flow-row xl:divide-gray-200';

  $: orderSummaryContainerClass =
    exitCheckout || processingOrder ? 'hidden xl:grid xl:col-start-1 xl:col-end-3' : 'xl:col-start-1 xl:col-end-3';

  $: orderArticleContainerClass = `${
    exitCheckout || processingOrder ? 'flex items-center' : ''
  } xl:col-start-4 xl:col-span-4 divide-x-4`;
</script>

<div class="container">
  {#if isLoading}
    <div class="w-full h-screen flex justify-center items-center">
      <DualRingLoader />
    </div>
  {:else}
    <div class={gridContainerClass}>
      <div class={orderSummaryContainerClass}>
        {#if ($media.xl || (!exitCheckout && !processingOrder)) && !isFullScreenComponent}
          <OrderSummary {sku} {product} {listing} {rate} {gasFee} closeIcon={handleExit} />
        {/if}
      </div>
      <div class={orderArticleContainerClass}>
        <article class="py-6 col-span-2 mx-auto max-w-xl xl:max-w-lg 2xl:max-w-3xl">
          <div class="flex justify-between">
            <h1 class="text-2xl mb-16 2xl:text-3xl">
              {#if paymentSelection}
                Select your Payment Method
              {:else if isOrdering}
                Complete your Purchase
              {/if}
            </h1>
            {#if $media.xl}
              <span class="cursor-pointer" on:click={handleExit}><Icon path={mdiClose} size={1.5} /></span>
            {/if}
          </div>
          {#if exitCheckout}
            <ExitCheckout onReturn={() => handleStateChange('method-select')} onExit={() => goto(routes.marketplace)} />
          {:else if processingOrder}
            <ProcessingOrder etherscanLink="https://etherscan.io/" />
          {:else if orderSuccess || orderError}
            <OrderStatus orderState={orderError ? 'error' : 'success'} {sku} />
          {:else if isOrdering}
            {#if orderingMm}
              <CompletePurchaseMM {sku} {listing} {gasFee} />
            {:else if orderingStripe}
              <StripeCheckout mintToAddress={ethAddress} {listing} {lazyMinting} />
            {/if}
          {:else if paymentSelection}
            <div class="items-center flex flex-col md:flex-row xl:flex-col 2xl:flex-row 2xl:justify-center">
              {#each paymentMethods as paymentMethod, i}
                {#if paymentMethod.available}
                  <PaymentButton
                    onClick={() => handlePaymentButton(paymentMethod.id)}
                    classNames={i === 0 && 'mb-6 md:mb-0 md:mr-6 xl:mr-0 xl:mb-6 2xl:mr-6 2xl:mb-0'}
                    title={paymentMethod.title}
                    iconSource={paymentMethod.iconSource}
                    id={paymentMethod.id}
                  />
                {/if}
              {/each}
            </div>
          {/if}
        </article>
      </div>
    </div>
  {/if}
</div>
