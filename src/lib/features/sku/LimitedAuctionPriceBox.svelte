<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import Button from '$lib/components/Button.svelte';

  export let collector: CollectorProduct;

  $: listing = collector.listing;
  $: active = listing.status === 'active';
  $: upcoming = listing.status === 'upcoming';
  $: sold = listing.status === 'sold';
</script>

<div class="flex flex-col gap-8 px-4 py-5 bg-black text-white md:bg-transparent">
  <div class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-2 gap-y-4 md:gap-y-8">
    {#if active}
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">Active Auction</div>
        <div class="text-sm">
          Ends
          {formatDate(listing.endDate)}
        </div>
      </div>
      <div class="flex flex-col items-center justify-self-end md:text-center md:justify-self-center">
        <div class="text-2xl">
          {formatCurrencyWithOptionalFractionDigits(collector.highestBid?.bidAmt || listing.minBid)}
        </div>
        <div class="text-sm">(Highest bid)</div>
      </div>
    {:else if upcoming}
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">Upcoming Auction</div>
        <div class="text-sm">
          Starts
          {formatDate(listing.startDate)}
        </div>
      </div>
      <div class="flex flex-col items-center justify-self-end md:text-center md:justify-self-center">
        <div class="text-2xl">{formatCurrencyWithOptionalFractionDigits(listing.minBid)}</div>
        <div class="text-sm">(Starting at)</div>
      </div>
    {:else if sold}
      <div class="flex-grow col-span-2">
        <div class="flex gap-4 items-center">
          <span class="text-6xl">#{collector.serialNumber}</span>
          <span class="text-6xl italic text-gray-400">/</span>
          <div class="flex flex-col">
            <span class="text-gray-400">Owner</span>
            <span>@{collector.owner.username}</span>
          </div>
        </div>
      </div>
    {/if}
    <div class="flex-grow col-span-2 md:col-span-1">
      <Button variant="tertiary" href="/product/{listing.product}">View NFT</Button>
    </div>
  </div>
</div>
