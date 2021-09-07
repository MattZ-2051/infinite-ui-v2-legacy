<script lang="ts">
  import { createForm } from 'felte';
  import { mdiArrowRight } from '@mdi/js';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import { readable } from 'svelte/store';
  import type { Product } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import notifications from '$ui/toast/toast.store';
  import Button from '$lib/components/Button.svelte';
  import { userId } from '$lib/user';
  import { formatCurrency } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import {
    hasActiveSale,
    canBuy,
    hasNoSale,
    hasUpcomingSale,
    hasUpcomingAuction,
    hasActiveAuction,
  } from './product.service';
  import { maxPlacedBid } from './product.store';
  import { onOrderIntent } from '../order/order.service';

  export let product: Product;

  function onBuy() {
    onOrderIntent({ product: product, listing: product.activeProductListings[0] });
  }

  function handleClick() {
    if ($errors.bid) {
      notifications.danger(Array.isArray($errors.bid) ? $errors.bid[0] : $errors.bid, { toastId: 'bidError' });
    }
  }

  const schema = yup.object({
    bid: yup.number().moreThan(0, 'Enter a positive amount.').required('Amount is required.'),
  });

  const { form, errors } = createForm<{ bid: number }>({
    onSubmit: () => {
      // TODO: handle submit
    },
    validate: validateSchema(schema),
  });

  $: showActiveSale = hasActiveSale(product);
  $: showBuy = canBuy(product, $userId);
  $: showNoSale = hasNoSale(product, $userId);
  $: showUpcoming = hasUpcomingSale(product);
  $: isActive = $polls[product._id]?.$isActive || readable(false);
</script>

<div {...$$restProps}>
  <form
    use:form
    class="flex flex-col md:flex-row relative w-full h-full md:rounded-lg overflow-hidden"
    autocomplete="off"
  >
    <input
      type="number"
      class="h-20 mr-0 md:mr-40 lg:mr-96 md:rounded-l-lg w-full text-default placeholder-white-opacity-40 text-xl pl-10 focus:outline-none focus:ring-2"
      name="bid"
      placeholder="Bid Amount $$"
    />
    <div class="md:absolute md:transform md:-translate-y-1/2 md:top-1/2 md:right-0">
      <Button
        animate={false}
        class="bid-button whitespace-nowrap text-lg h-20 w-full md:w-40 lg:w-96"
        type="submit"
        --button-border-radius="0"
        on:click={handleClick}>Place a bid <Icon class="ml-2" path={mdiArrowRight} size="1.5" /></Button
      >
    </div>
  </form>

  {#if showActiveSale}
    <div class="flex flex-col items-start pb-3.5">
      <span class="text-gray-400 text-xs">Active Sale</span>
      <span class="text-xl font-semibold">{formatCurrency(product.activeProductListings[0].price)}</span>
    </div>
  {/if}
  {#if showBuy}
    <button
      type="button"
      class="block text-center bg-gray-700 text-gray-200 text-sm font-semibold hover:bg-white hover:text-black rounded-full py-2 px-4"
      disabled={$isActive}
      on:click={onBuy}
    >
      {$isActive ? 'Processing ...' : 'Buy now'}
    </button>
  {/if}
  {#if showNoSale}
    <button
      type="button"
      disabled={true}
      class="text-center cursor-default bg-gray-700 text-gray-200 text-sm font-semibold rounded-full py-2 px-4"
    >
      Not for sale
    </button>
  {/if}
  {#if showUpcoming}
    <button
      type="button"
      disabled={true}
      class="text-center cursor-default bg-gray-700 text-gray-200 text-sm font-semibold rounded-full py-2 px-4"
    >
      Upcoming
    </button>
  {/if}
  {#if hasUpcomingAuction(product)}
    <div class="flex flex-col text-gray-400">
      <span class="text-xs ">Upcoming auction</span>
      <div class="font-semibold text-xl ">
        <span class="text-white"> {formatCurrency(product?.upcomingProductListings[0]?.minBid)}</span>
      </div>
    </div>
  {/if}
  {#if hasActiveAuction(product)}
    <div class="font-semibold text-xl text-gray-400">
      {$maxPlacedBid ? 'Highest Bid:' : 'Minimum Bid:'}
      <span class="text-white"> {formatCurrency($maxPlacedBid ? $maxPlacedBid : product.listing.minBid)}</span>
    </div>
  {/if}
</div>

<style lang="postcss">
  input {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#101010, #101010) padding-box,
      linear-gradient(90deg, #c000d6 0%, #6734ff 100%) border-box;
  }
</style>
