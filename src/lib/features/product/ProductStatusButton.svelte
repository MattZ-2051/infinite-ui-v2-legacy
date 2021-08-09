<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Product } from '$lib/sku-item/types';
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

  $: showActiveSale = hasActiveSale(product);
  $: showBuy = canBuy(product, $userId);
  $: showNoSale = hasNoSale(product, $userId);
  $: showUpcoming = hasUpcomingSale(product);
  $: isActive = $polls[product._id]?.$isActive || readable(false);
</script>

{#if showActiveSale}
  <div class="flex flex-col items-start pb-3.5">
    <span class="text-gray-400 text-xs">Active Sale</span>
    <span class="text-xl font-semibold">{formatCurrency(product.activeProductListings[0].price)}</span>
  </div>
{/if}
{#if showBuy}
  <button
    type="button"
    class="text-center bg-gray-700 text-gray-200 text-sm font-semibold hover:bg-white hover:text-black rounded-full py-2 px-4"
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
