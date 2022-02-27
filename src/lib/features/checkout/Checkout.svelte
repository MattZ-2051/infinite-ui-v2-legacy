<script lang="ts">
  import { onMount } from 'svelte';
  import { mdiClose } from '@mdi/js';
  import type { Product, Sku } from '$lib/sku-item/types';
  import type { ValidETHListingData } from './types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import { checkWalletInstalled, getWalletInfo, user, walletConnected } from '$lib/user';
  import metamaskIcon from '$lib/features/checkout/assets/metamask-icon';
  import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon';
  import { media } from '$lib/media-query.store';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { toast } from '$ui/toast';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';
  import PaymentButton from './PaymentButton.svelte';
  import ProcessingOrder from './ProcessingOrder.svelte';
  import OrderStatus from './OrderStatus.svelte';
  import CompletePurchaseMM from './CompletePurchaseMM.svelte';
  import { handlePayment, handleExit } from './checkout.service';
  import { validETHdirectPurchase } from './checkout.api';
  import { checkoutState, updateCheckoutState } from './checkout.store';
  import StripeCheckout from '../stripe/StripeCheckout.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);
  const paymentMethods = [
    { id: 'cc', title: 'Credit Card', iconSource: creditCardIcon },
    { id: 'mm', title: 'MetaMask', iconSource: metamaskIcon },
  ];

  $: exitCheckout = $checkoutState === 'exit';
  $: processingOrder = $checkoutState === 'processing';
  $: orderSuccess = $checkoutState === 'success';
  $: orderError = $checkoutState === 'error';
  $: orderingMm = $checkoutState === 'ordering-mm';
  $: orderingStripe = $checkoutState === 'ordering-stripe';
  $: paymentSelection = $checkoutState === 'method-select';
  $: isOrdering = $checkoutState.startsWith('ordering');

  $: isFullScreenComponent = orderSuccess || orderError;

  let validETHPurchase: ValidETHListingData;
  let ethAddress = undefined;

  onMount(async () => {
    const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');
    if (!clientSecret) {
      updateCheckoutState('method-select');
    }
    try {
      await checkWalletInstalled();
      validETHPurchase = await validETHdirectPurchase(listing._id);
    } catch (error) {
      if (error.message !== 'Metamask extension not found on browser') {
        validETHPurchase = undefined;
        if (sku.currency === 'ETH') {
          toast.danger('Currently not available for purchase', { toastId: 'LISTING_UNAVAILABLE' });
          return;
        }
      }
    }
  });

  const handleEthModalCallback = async ({ address, option }: { address: string; option: string }): Promise<void> => {
    if (option === 'metamask') {
      const data = await getWalletInfo();
      ethAddress = data.address;
    } else if (option === 'manual') {
      ethAddress = address;
    }
    updateCheckoutState('ordering-stripe');
  };

  const handlePaymentButton = (id: string) => {
    handlePayment({ id, walletConnected: $walletConnected, user: $user, handleEthModalCallback });
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
  <div class={gridContainerClass}>
    <div class={orderSummaryContainerClass}>
      {#if ($media.xl || (!exitCheckout && !processingOrder)) && !isFullScreenComponent}
        <OrderSummary {sku} {product} {listing} closeIcon={handleExit} />
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
          <ExitCheckout
            onReturn={() => updateCheckoutState('method-select')}
            onExit={() => goto(routes.sku(_sku._id))}
          />
        {:else if processingOrder}
          <ProcessingOrder etherscanLink="https://etherscan.io/" />
        {:else if orderSuccess || orderError}
          <OrderStatus orderState={orderError ? 'error' : 'success'} {sku} />
        {:else if isOrdering}
          {#if orderingMm}
            <CompletePurchaseMM {sku} {listing} />
          {:else if orderingStripe}
            <StripeCheckout mintToAddress={ethAddress} {listing} />
          {/if}
        {:else if paymentSelection}
          <div class="items-center flex flex-col md:flex-row xl:flex-col 2xl:flex-row 2xl:justify-center">
            {#each paymentMethods as paymentMethod, i}
              <PaymentButton
                onClick={() => handlePaymentButton(paymentMethod.id)}
                classNames={i === 0 && 'mb-6 md:mb-0 md:mr-6 xl:mr-0 xl:mb-6 2xl:mr-6 2xl:mb-0'}
                title={paymentMethod.title}
                iconSource={paymentMethod.iconSource}
                id={paymentMethod.id}
              />
            {/each}
          </div>
        {/if}
      </article>
    </div>
  </div>
</div>
