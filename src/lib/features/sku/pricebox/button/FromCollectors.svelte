<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$project/routes';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  type FromCollectorStatus =
    | 'activeSale'
    | 'activeAuction'
    | 'upcomingAuction'
    | 'noneForSale'
    | 'activeAuctionAndSale'
    | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let status: FromCollectorStatus = '';
  export let sku: Sku;
  export let collector: CollectorProduct;

  const collectorListing = collector?.listing;
  const isUniqueAuction = sku?.maxSupply === 1 && sku?.issuer?._id === collectorListing?.issuer?._id;
  const isUniqueProductListing = sku?.countProductListings === 1 && sku?.circulatingSupply === 1;
  const minBid =
    collectorListing?.saleType === 'auction'
      ? Math.max(collectorListing?.minBid, collectorListing?.highestBid?.bidAmt || 0)
      : 0;
  const href = isUniqueProductListing ? routes.product(collectorListing.product) : routes.collectors(sku._id);
</script>

<SkuPriceBoxButton {href} polling={$isPolling}>
  <div class="flex justify-between gap-2">
    {#if status === 'activeSale'}
      <div>
        <div class="text-xl">Active Sale</div>
        <div class="text-gray-500 text-sm">Started {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.price)}</div>
        </div>
      </div>
    {/if}

    {#if status === 'activeAuction'}
      <div>
        <div class="text-xl">{isUniqueAuction ? 'Active Auction' : 'From Collector'}</div>
        <div class="text-gray-500 text-sm">
          {isUniqueAuction ? `Ends ${formatDate(collectorListing.endDate)}` : 'Auction Active'}
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">
            {formatCurrencyWithOptionalFractionDigits(minBid)}
          </div>
          <div class="text-gray-500 text-sm">{isUniqueAuction ? 'Highest Bid' : 'Starting at'}</div>
        </div>
      </div>
    {/if}

    {#if status === 'upcomingAuction'}
      <div>
        <div class="text-xl">Upcoming Auction</div>
        <div class="text-gray-500 text-sm">Starts {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex items-center justify-end">
        <div>
          <div class="text-xl text-right">{formatCurrencyWithOptionalFractionDigits(collectorListing.minBid)}</div>
          <div class="text-gray-500 text-sm">Starting at</div>
        </div>
      </div>
    {/if}

    {#if status === 'noneForSale'}
      <div class="text-xl">From Collector</div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">-</div>
          <div class="text-gray-500 text-sm">0 on Sale</div>
        </div>
      </div>
    {/if}
    {#if status === 'activeAuctionAndSale'}
      <div>
        <div class="text-xl">From Collector</div>
        <div class="text-gray-500 text-sm">Buy Now / Auction</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-xl text-right">
            {formatCurrencyWithOptionalFractionDigits(collectorListing.price || minBid)}
          </div>
          <div class="text-gray-500 text-sm">Lowest Listing Price</div>
        </div>
      </div>
    {/if}
  </div>
</SkuPriceBoxButton>
