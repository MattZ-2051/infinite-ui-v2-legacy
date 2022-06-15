<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { CheckoutState, ValidETHListingData } from './types';
  import type { Product, Sku } from '$lib/sku-item/types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import { user } from '$lib/user';
  import { variables } from '$lib/variables';
  import { getWalletInfo } from '$lib/metamask';
  import metamaskIcon from '$lib/features/checkout/assets/metamask-icon';
  import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import closeIcon from '$lib/components/icons/close';
  import { media } from '$lib/media-query.store';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/env';
  import routes from '$project/routes';
  import { toast } from '$ui/toast';
  import Icon from '$ui/icon/Icon.svelte';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';
  import PaymentButton from './PaymentButton.svelte';
  import ProcessingOrder from './ProcessingOrder.svelte';
  import OrderStatus from './OrderStatus.svelte';
  import CompletePurchaseMM from './CompletePurchaseMM.svelte';
  import { handlePayment, handleExit, handleCheckoutStateChange } from './checkout.service';
  import { getCosts, validETHdirectPurchase } from './checkout.api';
  import { checkoutState, voucher } from './checkout.store';
  import StripeCheckout from '../stripe/StripeCheckout.svelte';
  import PendingCheckoutPage from './PendingCheckoutPage.svelte';
  import { validateVoucherCode } from '../sku/voucher/voucher.api';
  import CompletePurchaseUsd from './CompletePurchaseUsd.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  const DISABLED_MARKETPLACE = variables.disabledMarketplace;
  const MM_WALLET_ENABLED = variables.metamask.walletEnabled;
  const STRIPE_ENABLED = variables.stripe.enabled;
  const MM_PENDING_TIMEOUT = 600_000;
  const backButtonLabel = DISABLED_MARKETPLACE ? 'home' : 'marketplace';
  const listing = sku ? getActiveListings(sku)[0] : product?.productListings?.[0];
  const isEthListing = sku?.currency === 'ETH';
  const isUsdListing = product?.sku?.currency === 'USD' || sku?.currency === 'USD';
  const currency = sku ? sku?.currency : product?.sku?.currency;
  const checkoutTitleMessageMap = {
    fixed: 'Complete your purchase',
    auction: 'Place your bid',
    giveaway: 'Claim your giveaway',
  };

  let lazyMinting = false;
  let showPendingPage = false;

  const paymentMethods = [
    {
      id: 'cc-usd',
      title: 'Credit Card',
      iconSource: creditCardIcon,
      available: STRIPE_ENABLED && isUsdListing && !product && listing?.saleType === 'fixed',
    },
    {
      id: 'cc-eth',
      title: 'Credit Card',
      iconSource: creditCardIcon,
      available: STRIPE_ENABLED && isEthListing && sku,
    },
    { id: 'mm', title: 'MetaMask', iconSource: metamaskIcon, available: MM_WALLET_ENABLED && isEthListing },
    { id: 'balance', title: 'Your Balance', iconSource: creditCardIcon, available: isUsdListing },
  ];

  const availablePaymentMethods = paymentMethods.filter((paymentMethod) => paymentMethod.available);

  let finalSelectedMethod: string;
  $: exitCheckout = $checkoutState === 'exit';
  $: processingOrder = $checkoutState === 'processing';
  $: orderSuccess = $checkoutState === 'success';
  $: orderError = $checkoutState === 'error';
  $: orderingMm = $checkoutState === 'ordering-mm';
  $: orderingStripe = $checkoutState === 'ordering-stripe';
  $: orderingBalance = $checkoutState === 'ordering-balance';
  $: paymentSelection = $checkoutState === 'method-select';
  $: isLoading = $checkoutState === 'loading';
  $: isOrdering = $checkoutState.startsWith('ordering');

  $: isFullScreenComponent = orderSuccess || orderError;
  $: processingOrder && intervalToShowPendingPage();
  let gasFee: number;
  let rate: number;

  let validETHPurchase: ValidETHListingData;
  let ethAddress = undefined;

  const intervalToShowPendingPage = () =>
    setTimeout(() => {
      showPendingPage = true;
    }, MM_PENDING_TIMEOUT);

  const validateVoucher = async (): Promise<void> => {
    const isVoucherSku = listing?.enabledNftPurchase;
    const paymentIntent = $page.url.searchParams.get('payment_intent');
    if (isVoucherSku && !($voucher.verified || paymentIntent)) {
      try {
        const voucherCode = $page.url.searchParams.get('voucherCode');
        const skuId = $page.params.id;
        await validateVoucherCode({ voucherCode, skuId });
      } catch {
        goto(routes.sku($page.params.id));
        return;
      }
    }
  };

  const getPaymentInfo = async (): Promise<void> => {
    try {
      const costs = await getCosts(listing._id);

      gasFee = +costs.networkFee.gas;
      rate = +costs.rate.amount;

      validETHPurchase = await validETHdirectPurchase(listing._id);
    } catch {
      validETHPurchase = undefined;
      if (sku?.currency === 'ETH') {
        toast.danger('Currently not available for purchase', { toastId: 'LISTING_UNAVAILABLE' });
        return;
      }
    }
  };

  onMount(async () => {
    if (listing?.saleType) {
      toast.danger('Whoops! We were not able to load the page. Try again, please.');
      goToItemPage();
    }
    validateVoucher();
    const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');
    if (!clientSecret) {
      handleCheckoutStateChange((localStorage.getItem('checkout-state') as CheckoutState) || 'method-select');
    }
    if (isEthListing) {
      getPaymentInfo();
    }
  });

  onDestroy(async () => {
    if (browser) {
      localStorage.removeItem('checkout-state');
    }
  });

  const handleEthModalCallback = async ({ address, option }: { address: string; option: string }): Promise<void> => {
    switch (option) {
      case 'metamask': {
        const data = await getWalletInfo();
        ethAddress = data.address;
        break;
      }
      case 'manual': {
        ethAddress = address;
        break;
      }
      case 'later': {
        lazyMinting = true;
        break;
      }
    }

    handleCheckoutStateChange('ordering-stripe');
  };

  const handlePaymentButton = (id: string) => {
    finalSelectedMethod = id;
    handlePayment({ id, user: $user, handleEthModalCallback, skuMintPolicy: sku?.mintPolicy });
  };

  const handleExitCheckout = () => {
    DISABLED_MARKETPLACE ? goto(routes.index) : goto(routes.marketplace);
  };

  const goToItemPage = () => {
    const route = product ? routes.product(product._id) : routes.sku(sku._id);
    goto(route);
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
          <OrderSummary {sku} {product} {listing} {rate} {gasFee} handleClose={handleExit} />
        {/if}
      </div>
      <div class={orderArticleContainerClass}>
        <article class="py-6 col-span-2 mx-auto max-w-xl xl:max-w-lg 2xl:max-w-3xl">
          {#if !isFullScreenComponent}
            <div class="flex justify-between">
              <h1 class={`text-2xl ${paymentSelection ? 'mb-14' : 'mb-10'} 2xl:text-3xl second-font`}>
                {#if paymentSelection}
                  Select your Payment Method
                {:else if isOrdering && listing?.saleType && checkoutTitleMessageMap[listing.saleType]}
                  {checkoutTitleMessageMap[listing.saleType]}
                {/if}
              </h1>
              {#if $media.xl && !exitCheckout && !processingOrder && !showPendingPage}
                <span class="cursor-pointer mt-1" on:click={handleExit}><Icon path={closeIcon} size={1.5} /></span>
              {/if}
            </div>
          {/if}
          {#if exitCheckout}
            <ExitCheckout
              exitLabel={backButtonLabel}
              onReturn={() => handleCheckoutStateChange('method-select')}
              onExit={handleExitCheckout}
            />
          {:else if processingOrder}
            {#if showPendingPage}
              <PendingCheckoutPage />
            {:else}
              <ProcessingOrder {currency} />
            {/if}
          {:else if orderSuccess || orderError}
            <OrderStatus
              orderState={orderError ? 'error' : 'success'}
              {listing}
              {product}
              {sku}
              {lazyMinting}
              {ethAddress}
              onExit={handleExitCheckout}
              {backButtonLabel}
              {finalSelectedMethod}
            />
          {:else if isOrdering}
            {#if orderingMm && isEthListing}
              <CompletePurchaseMM {sku} {listing} {gasFee} lazyMinting={false} conversionRate={rate} />
            {:else if orderingStripe}
              <StripeCheckout mintToAddress={ethAddress} {listing} {lazyMinting} conversionRate={rate} />
            {:else if orderingBalance}
              <CompletePurchaseUsd {listing} {sku} {product} />
            {/if}
          {:else if paymentSelection}
            <div class="items-center flex flex-col md:flex-row xl:flex-col 2xl:flex-row 2xl:justify-center h-full">
              {#each availablePaymentMethods as paymentMethod, i}
                <ThemeContext id="payment-buttons">
                  <PaymentButton
                    onClick={() => handlePaymentButton(paymentMethod.id)}
                    classNames={i !== availablePaymentMethods.length - 1 &&
                      'mb-6 md:mb-0 md:mr-6 xl:mr-0 xl:mb-6 2xl:mr-6 2xl:mb-0'}
                    title={paymentMethod.title}
                    iconSource={paymentMethod.iconSource}
                    id={paymentMethod.id}
                  />
                </ThemeContext>
              {/each}
            </div>
          {/if}
        </article>
      </div>
    </div>
  {/if}
</div>
