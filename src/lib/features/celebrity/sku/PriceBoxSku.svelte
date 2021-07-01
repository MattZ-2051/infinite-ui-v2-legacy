<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { toast } from '$ui/toast';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';

  export let sku: Sku;
  $: numSkuListings = sku.skuListings.length;
  $: activeListings = sku.skuListings.filter((skuListing) => skuListing.status === 'active' && !skuListing.canceled);
  $: upcomingSkuListings = sku.skuListings.filter(
    (skuListing) => skuListing.status === 'upcoming' && !skuListing.canceled
  );
  $: upcoming = upcomingSkuListings.length > 0 && activeListings.length === 0;
  $: active = activeListings.length > 0 && sku.totalSkuListingSupplyLeft;
  $: noSale = sku.totalSkuListingSupplyLeft < 1 && numSkuListings > 0;
  $: expiredListings = sku.skuListings.filter((skuListing) => skuListing.status === 'expired');
  $: minimumBid =
    active &&
    sku?.activeProductListings.length > 0 &&
    sku?.activeProductListings
      .map((item) => item.price)
      .reduce((previous, next) => {
        if (next < previous) {
          return next;
        }
        return previous;
      });
</script>

<div class="flex flex-col gap-8">
  <div class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-2 gap-y-4 md:gap-y-12">
    {#if active}
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">From Creator</div>
        <div class="text-base">Initial Listing Price</div>
      </div>
      <div class="flex-none text-white text-center">
        <div class="text-3xl">${activeListings[0].price}</div>
        <div class="text-sm">
          {sku?.totalSkuListingSupplyLeft >= 0 && `(${sku?.totalSkuListingSupplyLeft} left)`}
        </div>
      </div>
      <div class="flex-grow flex justify-center col-span-2 md:col-span-1">
        <button
          type="button"
          class="w-full max-w-xs text-center bg-white text-black hover:bg-gray-500 hover:text-white rounded-full text-xl px-10 py-3 mb-12 md:mb-0"
          on:click={() => toast.danger('You need to be <b>logged in</b> to complete your purchase!')}
        >
          Buy Now
        </button>
      </div>
      {#if sku.activeProductListings.length > 0}
        <div class="border-b-2 border-gray-900 col-span-3" />
        <div class="flex-grow text-gray-400">
          <div class="text-2xl">From Collectors</div>
          <div class="text-base">Lowest Listing Price</div>
        </div>
        <div class="flex-none text-white text-center">
          <div class="text-3xl">${minimumBid}</div>
          <div class="text-sm">{`(${sku.activeProductListings.length} for sale)`}</div>
        </div>
        <div class="flex-grow flex justify-center col-span-2 md:col-span-1">
          <a
            href="/collectors/{sku._id}"
            class="w-full max-w-xs text-center bg-white text-black hover:bg-gray-500 hover:text-white rounded-full text-xl px-10 py-3"
          >
            See All
          </a>
        </div>
      {/if}
    {:else if upcoming}
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">Upcoming</div>
      </div>
      <div class="flex-none text-white text-center">
        <div class="text-3xl">${upcomingSkuListings[0]?.price || 12}</div>
        {#if sku.supplyType !== 'variable'}
          <div class="text-sm">{upcomingSkuListings[0]?.supply || 0} items</div>
        {/if}
      </div>
      <div class="flex-grow justify-center col-span-2 text-3xl text-white md:col-span-1">
        <TimeDifference date={sku.startDate || new Date()} />
        <div class="text-sm text-gray-400">
          {sku.startDate?.toLocaleDateString() || new Date().toLocaleDateString()}
        </div>
      </div>
    {:else if noSale}
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">From Creator</div>
        <div class="text-base">Initial Listing Price</div>
      </div>
      <div class="flex-none text-white text-center">
        <div class="text-3xl">${expiredListings[0]?.price || 0}</div>
        <div class="text-sm">
          {sku?.totalSkuListingSupplyLeft >= 0 && `(${sku?.totalSkuListingSupplyLeft} left)`}
        </div>
      </div>
      <div class="flex-grow flex justify-center col-span-2 md:col-span-1">
        <button
          type="button"
          disabled={true}
          class="w-full max-w-xs text-center bg-white text-black cursor-default rounded-full text-xl px-10 py-3 mb-12 md:mb-0"
        >
          Sold Out
        </button>
      </div>
    {/if}
  </div>
</div>
