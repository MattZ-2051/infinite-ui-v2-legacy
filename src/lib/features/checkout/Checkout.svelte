<script lang="ts">
  import { onMount } from 'svelte';
  import type { Product, Sku } from '$lib/sku-item/types';
  import type { ValidETHListingData } from '../order/types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import { walletConnected } from '$lib/user';
  import metamaskIcon from '$lib/features/checkout/assets/metamask-icon';
  import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { toast } from '$ui/toast';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';
  import PaymentButton from './PaymentButton.svelte';
  import ProcessingOrder from './ProcessingOrder.svelte';
  import { connectWallet } from './checkout.service';
  import { validETHdirectPurchase } from '../order/order.api';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);
  const paymentMethods = [
    { id: 'cc', title: 'Credit Card', iconSource: creditCardIcon },
    { id: 'mm', title: 'MetaMask', iconSource: metamaskIcon },
  ];

  let exitCheckout = false;
  let processingOrder = false;
  let validETHPurchase: ValidETHListingData;

  onMount(async () => {
    try {
      validETHPurchase = await validETHdirectPurchase(listing._id);
    } catch {
      validETHPurchase = undefined;
      if (sku.currency === 'ETH') {
        toast.danger('Currently not available for purchase', { toastId: 'LISTING_UNAVAILABLE' });
        return;
      }
    }
  });

  const handlePayment = async (id: string) => {
    // TODO: depending on the payment method selected, display correct form
    if (id === 'mm' && !$walletConnected) {
      await connectWallet();
    } else if (id === 'mm' && $walletConnected && validETHPurchase) {
      // TODO (matt): will change state here to show complete purchase component for metamask
      return id;
    }
    return id;
  };

  const orderSummaryContainerClass =
    exitCheckout || processingOrder ? 'hidden xl:col-start-1 xl:col-end-3 xl:grid' : 'xl:col-start-1 xl:col-end-3';

  const orderArticleContainerClass = `${
    exitCheckout || processingOrder ? 'flex items-center' : ''
  } xl:col-start-4 xl:col-span-4 divide-x-4`;
</script>

<div class="container">
  <div class="grid grid-flow-row xl:divide-x xl:divide-gray-200">
    <div class={orderSummaryContainerClass}>
      <OrderSummary {sku} {product} {listing} />
    </div>
    <div class={orderArticleContainerClass}>
      <article class="py-6 col-span-2 mx-auto max-w-xl xl:max-w-lg 2xl:max-w-3xl">
        {#if exitCheckout}
          <ExitCheckout onReturn={() => (exitCheckout = false)} onExit={() => goto(routes.sku(_sku._id))} />
        {:else if processingOrder}
          <ProcessingOrder etherscanLink="https://etherscan.io/" />
        {:else}
          <h1 class="text-2xl mb-16 2xl:mb-52 2xl:text-3xl">Select your Payment Method</h1>
          <div class="items-center flex flex-col md:flex-row xl:flex-col 2xl:flex-row 2xl:justify-center">
            {#each paymentMethods as paymentMethod, i}
              <PaymentButton
                onClick={() => handlePayment(paymentMethod.id)}
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
