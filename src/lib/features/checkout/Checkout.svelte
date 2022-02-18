<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import metamaskIcon from '$lib/features/checkout/assets/metamask-icon';
  import creditCardIcon from '$lib/features/checkout/assets/creditcard-icon';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';
  import PaymentButton from './PaymentButton.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);
  let exitCheckout = false;

  const paymentMethods = [
    { id: 'cc', title: 'Credit Card', iconSource: creditCardIcon },
    { id: 'mm', title: 'MetaMask', iconSource: metamaskIcon },
  ];

  const handlePayment = (id: string) => {
    // TODO: depending on the payment method selected, display correct form
    return id;
  };
</script>

<div class="container">
  {#if exitCheckout}
    <ExitCheckout onReturn={() => (exitCheckout = false)} onExit={() => goto(routes.sku(_sku._id))} />
  {:else}
    <div class="grid grid-flow-row xl:divide-x xl:divide-gray-200">
      <div class="xl:col-start-1 xl:col-end-3">
        <OrderSummary {sku} {product} {listing} />
      </div>
      <div class="xl:col-start-4 xl:col-span-4 divide-x-4">
        <article class="py-6 col-span-2 mx-auto max-w-xl xl:max-w-lg 2xl:max-w-3xl">
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
        </article>
      </div>
    </div>
  {/if}
</div>
