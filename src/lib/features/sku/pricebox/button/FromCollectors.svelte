<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$lib/routes';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  type FromCollectorStatus = 'activeSale' | 'activeAuction' | 'upcomingAuction' | 'noneForSale' | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let status: FromCollectorStatus = '';
  export let sku: Sku;
  export let collector: CollectorProduct;

  const collectorListing = collector.listing;

  const href = status === 'noneForSale' ? routes.collectors(sku._id) : routes.product(collectorListing.product);
</script>

<SkuPriceBoxButton {href} polling={$isPolling}>
  <div class="flex justify-between gap-2">
    {#if status === 'activeSale'}
      <div>
        <div class="text-xl">Active Sale</div>
        <div class="text-black-opacity-50 text-sm">Started {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.price)}</div>
        </div>
      </div>
    {/if}

    {#if status === 'activeAuction'}
      <div>
        <div class="text-xl">From Collector</div>
        <div class="text-black-opacity-50 text-sm">Auction active</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.minBid)}</div>
          <div class="text-black-opacity-50 text-sm">Starting at</div>
        </div>
      </div>
    {/if}

    {#if status === 'upcomingAuction'}
      <div>
        <div class="text-xl">Upcoming Auction</div>
        <div class="text-black-opacity-50 text-sm">Starts {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex items-center justify-end">
        <div>
          <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.minBid)}</div>
          <div class="text-black-opacity-50 text-sm">Starting at</div>
        </div>
      </div>
    {/if}

    {#if status === 'noneForSale'}
      <div class="text-xl">From Collector</div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">-</div>
          <div class="text-black-opacity-50 text-sm">0 on Sale</div>
        </div>
      </div>
    {/if}
  </div>
</SkuPriceBoxButton>
