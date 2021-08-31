<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiArrowRight, mdiInfinity } from '@mdi/js';
  import { readable } from 'svelte/store';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';

  type FromCreatorState = 'upcoming' | 'noSale' | 'active' | 'upcomingNftGiveAway' | 'activeNftGiveAway' | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let sku: Sku;
  export let onBuy: () => void;
  export let state: FromCreatorState = '';
  export let activeListings = [];
  export let upcomingSkuListings = [];
</script>

<div class="flex flex-col gap-8 px-8 py-5 bg-white font-normal text-black">
  {#if state === 'active' || state === 'noSale'}
    <div class="grid grid-cols-2 items-center gap-y-4 " style="grid-template-columns: 40% 60%">
      <div class="flex-grow text-black">
        <div class="text-xl">From Creator</div>
        {#if state === 'active'}
          <div class="text-black-opacity-50 text-sm">{sku?.totalSkuListingSupplyLeft} Items left</div>
        {/if}
        {#if state === 'noSale'}
          <div class="text-black-opacity-50 text-sm">Initial Listing Price</div>
        {/if}
      </div>
      {#if state === 'active'}
        <div class="flex text-black justify-end">
          <div>
            <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(activeListings[0].price)}</div>
            <div class="text-sm text-right text-black-opacity-50 ">Initial Listing Price</div>
          </div>
          <button class="pl-8 flex items-center button" on:click={onBuy} disabled={$isPolling}>
            <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
          </button>
        </div>
      {/if}
      {#if state === 'noSale'}
        <div class="text-base text-black-opacity-50 text-right">Sold Out</div>
      {/if}
    </div>
  {/if}

  {#if state === 'upcoming'}
    <div class="grid items-center gap-x-2 gap-y-4" style="grid-template-columns: 30% 50% 20%">
      <div class="flex-grow">
        <div class="text-xl">Upcoming</div>
        <div class="text-black-opacity-50 text-sm">{sku?.totalSupplyUpcoming} NFT</div>
      </div>
      <div class="flex-grow justify-center text-right text-xl">
        <TimeDifference date={sku?.minStartDate} />
        <div class="text-black-opacity-50 text-sm">{formatDate(sku.minStartDate)}</div>
      </div>
      <div class="text-xl text-center">{formatCurrencyWithOptionalFractionDigits(upcomingSkuListings[0]?.price)}</div>
    </div>
  {/if}

  {#if state === 'upcomingNftGiveAway'}
    <div class="grid items-center gap-x-2 gap-y-4 " style="grid-template-columns: 70% 30%">
      <div class="flex-grow text-black">
        <div class="text-xl">Upcoming NFT Giveaway</div>
        <div class="text-black-opacity-50 text-sm">Starts {formatDate(upcomingSkuListings[0]?.startDate)}</div>
      </div>
      <div class="flex text-black justify-end">
        {#if sku.supplyType === 'variable'}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" color="black" />
            </div>
            <div class="text-sm text-right text-black-opacity-50">Open Edition</div>
          </div>
        {:else}
          <div>
            <div class="text-xl text-right">{sku?.maxSupply}</div>
            <div class="text-sm text-right text-black-opacity-50">To be released</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if state === 'activeNftGiveAway'}
    <div class="grid grid-cols-2 items-center gap-x-2 gap-y-4">
      <div class="flex-grow text-black">
        <div class="text-xl">NFT Giveaway</div>
        <div class="text-black-opacity-50 text-sm">Ends {formatDate(activeListings[0]?.startDate)}</div>
      </div>
      <div class="flex text-black justify-end">
        {#if !sku?.maxSupply}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" color="black" />
            </div>
            <div class="text-sm text-right text-black-opacity-50">Open Edition</div>
          </div>
        {/if}
        {#if sku?.maxSupply > 0}
          <div>
            <div class="text-xl text-right">{sku?.maxSupply}</div>
            <div class="text-sm text-right text-black-opacity-50">Remaining</div>
          </div>
        {/if}
        <button class="pl-8 flex items-center" on:click={onBuy} disabled={$isPolling}>
          <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
        </button>
      </div>
    </div>
  {/if}
</div>
