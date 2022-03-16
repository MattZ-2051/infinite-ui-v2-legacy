<script lang="ts">
  import { onMount } from 'svelte';
  import type { Sku } from '$lib/sku-item/types';
  import { mdiInfinity } from '@mdi/js';
  import { readable } from 'svelte/store';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { toast } from '$ui/toast';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';
  import { getNumberOfSkus } from '../../sku.api';

  type FromCreatorState =
    | 'upcoming'
    | 'noSale'
    | 'active'
    | 'upcomingNftGiveAway'
    | 'activeNftGiveAway'
    | 'notMinted'
    | 'active-whitelist'
    | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let sku: Sku;
  export let onBuy: () => void;
  export let state: FromCreatorState = '';
  export let activeListings = [];
  export let upcomingSkuListings = [];

  let numberOfVoucherSkusLeft = 0;

  onMount(async () => {
    if (state === 'active-whitelist') {
      try {
        const data = await getNumberOfSkus({ id: sku._id });
        numberOfVoucherSkusLeft = data;
      } catch {
        toast.danger('An error ocurred calculating sku supply left');
      }
    }
  });

  $: activeListing = activeListings?.[0];
  $: skuPrice =
    activeListing?.saleType === 'auction'
      ? Math.max(activeListing.highestBid?.bidAmt || 0, activeListing?.minBid)
      : activeListing?.price;

  const getAuctionLabelCreator = (saleType) => {
    if (saleType === 'auction') {
      const existsBid: boolean = activeListing.highestBid !== undefined;
      return existsBid ? 'Latest bid' : 'Minimum bid';
    } else {
      return 'Listing price';
    }
  };
</script>

<SkuPriceBoxButton
  action={state === 'active' ||
    state === 'activeNftGiveAway' ||
    (state === 'active-whitelist' && numberOfVoucherSkusLeft)}
  polling={$isPolling}
  on:click={onBuy}
  class="from-creator-custom"
>
  {#if state === 'active' || state === 'noSale' || state === 'notMinted' || state === 'active-whitelist'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-2xl">Buy From Creator</div>
        {#if (state === 'active' && sku?.supplyType !== 'variable') || state === 'active-whitelist'}
          <div class="text-gray-500 text-base">
            {#if state === 'active-whitelist'}
              {numberOfVoucherSkusLeft}
            {:else if state === 'active'}
              {sku?.totalSupplyLeft}
            {/if}
            {sku?.totalSupplyLeft === 1 || numberOfVoucherSkusLeft === 1 ? 'Item Left' : 'Items Left'}
          </div>
        {/if}
        {#if state === 'noSale'}
          <div class="text-gray-500 text-sm">Initial Listing Price</div>
        {/if}
      </div>
      {#if state === 'active'}
        <div class="flex justify-end">
          <div>
            <div class="text-2xl text-right">
              {formatCurrencyWithOptionalFractionDigits(skuPrice, { currency: sku.currency })}
            </div>
            <div class="text-base text-right text-gray-500 ">
              {getAuctionLabelCreator(activeListing.saleType)}
            </div>
          </div>
        </div>
      {/if}
      {#if state === 'noSale'}
        <div class="text-base text-gray-500 text-right">Not for sale</div>
      {/if}
      {#if state === 'notMinted'}
        <div class="text-base text-gray-500 text-right">Upcoming</div>
      {/if}
    </div>
  {/if}

  {#if state === 'upcoming'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-2xl">Upcoming</div>
        {#if sku?.supplyType !== 'variable'}<div class="text-gray-500 text-base">
            {sku?.totalUpcomingSupply} NFT
          </div>{/if}
      </div>
      <div class="flex-grow justify-center text-right text-2xl">
        <TimeDifference date={sku?.minStartDate} />
        <div class="text-gray-500 text-base">{formatDate(sku.minStartDate)}</div>
      </div>
      <div class="pl-4 text-2xl text-center">
        {formatCurrencyWithOptionalFractionDigits(upcomingSkuListings[0]?.price, { currency: sku.currency })}
      </div>
    </div>
  {/if}

  {#if state === 'upcomingNftGiveAway'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-2xl">Upcoming NFT Giveaway</div>
        <div class="text-gray-500 text-base">Starts {formatDate(upcomingSkuListings[0]?.startDate)}</div>
      </div>
      <div class="flex justify-end">
        {#if sku.supplyType === 'variable'}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" />
            </div>
            <div class="text-base text-right text-gray-500">Open Edition</div>
          </div>
        {:else}
          <div>
            <div class="text-2xl text-right">{sku?.maxSupply}</div>
            <div class="text-base text-right text-gray-500">To be released</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if state === 'activeNftGiveAway'}
    <div class="flex justify-between items-center gap-x-2">
      <div class="flex-grow">
        <div class="text-2xl">NFT Giveaway</div>
        <div class="text-gray-500 text-base">Started {formatDate(activeListing.startDate)}</div>
      </div>
      <div class="flex justify-end">
        {#if sku.supplyType === 'variable'}
          <div>
            <div class="flex justify-end">
              <Icon path={mdiInfinity} size="1.5" />
            </div>
            <div class="text-base text-right text-gray-500">Open Edition</div>
          </div>
        {:else}
          <div>
            <div class="text-2xl text-right">{sku?.totalSkuListingSupplyLeft}</div>
            <div class="text-base text-right text-gray-500">Remaining</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</SkuPriceBoxButton>
