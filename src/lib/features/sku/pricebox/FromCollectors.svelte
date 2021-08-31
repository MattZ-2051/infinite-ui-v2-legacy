<script lang="ts">
  import { readable } from 'svelte/store';
  import { mdiArrowRight } from '@mdi/js';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$lib/routes';

  type FromCollectorStatus = 'activeSale' | 'activeAuction' | 'upcomingAuction' | 'noneForSale' | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let status: FromCollectorStatus = '';
  export let sku: Sku;
  export let collector: CollectorProduct;

  const collectorListing = collector.listing;
</script>

{#if status === 'activeSale'}
  <div class="border-b-2 border-gray-800 bg-white" />
  <div class="grid grid-cols-2 gap-8 px-8 py-5 bg-white font-normal text-black">
    <div>
      <div class="text-xl">Active Sale</div>
      <div class="text-black-opacity-50 text-sm">Started {formatDate(collectorListing.startDate)}</div>
    </div>
    <div class="flex text-black justify-end items-center">
      <div>
        <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.price)}</div>
      </div>
      <a class="pl-8 flex items-center" href={routes.product(collectorListing.product)}>
        <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
      </a>
    </div>
  </div>
{/if}

{#if status === 'activeAuction'}
  <div class="border-b-2 border-gray-800 bg-white" />
  <div class="grid grid-cols-2 gap-8 px-8 py-5 bg-white font-normal text-black">
    <div>
      <div class="text-xl">From Collector</div>
      <div class="text-black-opacity-50 text-sm">Auction active</div>
    </div>
    <div class="flex text-black justify-end items-center">
      <div>
        <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.minBid)}</div>
        <div class="text-black-opacity-50 text-sm">Starting at</div>
      </div>
      <a class="pl-8 flex items-center" href={routes.product(collectorListing.product)}>
        <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
      </a>
    </div>
  </div>
{/if}

{#if status === 'upcomingAuction'}
  <div class="border-b-2 border-gray-800 bg-white" />
  <div class="grid grid-cols-2 gap-8 px-8 py-5 bg-white font-normal text-black">
    <div>
      <div class="text-xl">Upcoming Auction</div>
      <div class="text-black-opacity-50 text-sm">Starts {formatDate(collectorListing.startDate)}</div>
    </div>
    <div class="flex text-black items-center justify-end">
      <div>
        <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.minBid)}</div>
        <div class="text-black-opacity-50 text-sm">Starting at</div>
      </div>
      <a class="pl-8 flex items-center" href={routes.product(collectorListing.product)}>
        <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
      </a>
    </div>
  </div>
{/if}

{#if status === 'noneForSale'}
  <div class="border-b-2 border-gray-800 bg-white" />
  <div class="grid grid-cols-2 gap-8 px-8 py-5 bg-white font-normal text-black">
    <div>
      <div class="text-xl">From Collector</div>
    </div>
    <div class="flex text-black justify-end items-center">
      <div>
        <div class="text-xl text-right">-</div>
        <div class="text-black-opacity-50 text-sm">0 on Sale</div>
      </div>
      <a class="pl-8 flex items-center" href={routes.collectors(sku._id)}>
        <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
      </a>
    </div>
  </div>
{/if}
