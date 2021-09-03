<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiInfinity } from '@mdi/js';
  import { readable } from 'svelte/store';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  type FromCreatorState = 'upcoming' | 'noSale' | 'active' | 'upcomingNftGiveAway' | 'activeNftGiveAway' | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let sku: Sku;
  export let onBuy: () => void;
  export let state: FromCreatorState = '';
  export let activeListings = [];
  export let upcomingSkuListings = [];
</script>

<SkuPriceBoxButton action={state === 'active' || state === 'activeNftGiveAway'} polling={$isPolling} on:click={onBuy}>
  {#if state === 'active' || state === 'noSale'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-xl">From Creator</div>
        {#if state === 'active'}
          <div class="text-black-opacity-50 text-sm">{sku?.totalSkuListingSupplyLeft} Items left</div>
        {/if}
        {#if state === 'noSale'}
          <div class="text-black-opacity-50 text-sm">Initial Listing Price</div>
        {/if}
      </div>
      {#if state === 'active'}
        <div class="flex justify-end">
          <div>
            <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(activeListings[0].price)}</div>
            <div class="text-sm text-right text-black-opacity-50 ">Initial Listing Price</div>
          </div>
        </div>
      {/if}
      {#if state === 'noSale'}
        <div class="text-base text-black-opacity-50 text-right">Sold Out</div>
      {/if}
    </div>
  {/if}

  {#if state === 'upcoming'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-xl">Upcoming</div>
        <div class="text-black-opacity-50 text-sm">{sku?.totalUpcomingSupply} NFT</div>
      </div>
      <div class="flex-grow justify-center text-right text-xl">
        <TimeDifference date={sku?.minStartDate} />
        <div class="text-black-opacity-50 text-sm">{formatDate(sku.minStartDate)}</div>
      </div>
      <div class="pl-4 text-xl text-center">
        {formatCurrencyWithOptionalFractionDigits(upcomingSkuListings[0]?.price)}
      </div>
    </div>
  {/if}

  {#if state === 'upcomingNftGiveAway'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-xl">Upcoming NFT Giveaway</div>
        <div class="text-black-opacity-50 text-sm">Starts {formatDate(upcomingSkuListings[0]?.startDate)}</div>
      </div>
      <div class="flex justify-end">
        {#if sku.supplyType === 'variable'}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" />
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
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-xl">NFT Giveaway</div>
        <div class="text-black-opacity-50 text-sm">Ends {formatDate(activeListings[0]?.startDate)}</div>
      </div>
      <div class="flex justify-end">
        {#if !sku?.maxSupply}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" />
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
      </div>
    </div>
  {/if}
</SkuPriceBoxButton>
