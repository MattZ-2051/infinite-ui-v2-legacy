<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku, Listing } from '$lib/sku-item/types';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  type FromCollectorStatus =
    | 'activeSale'
    | 'activeAuction'
    | 'upcomingAuction'
    | 'noneForSale'
    | 'activeAuctionAndSale'
    | 'ethSkuSale'
    | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let status: FromCollectorStatus = '';
  export let sku: Sku;
  export let collectorListing: Listing;

  const isOnlyAuction = sku?.activeAuctionProductListingsCounter === 1;
  const isNoAuctions = sku?.activeAuctionProductListingsCounter === 0;
  const isOnlyBuyNow = sku?.activeBuyNowProductListingsCounter === 1;
  const isNoBuyNows = sku?.activeBuyNowProductListingsCounter === 0;

  const isUniqueAuction = isOnlyAuction && isNoBuyNows;
  const isUniqueBuyNow = isOnlyBuyNow && isNoAuctions;
  const isUniqueProductListing = isUniqueAuction || isUniqueBuyNow;
  const isMintLaterSku = sku?.mintPolicy?.transaction === 'later';
  const collectorRouteParamater = isMintLaterSku ? '?mintStatus=all&sortBy=serialNumber:desc' : '?saleType=all';
  const href = isUniqueProductListing
    ? routes.product(collectorListing.product)
    : routes.collectors(sku._id, collectorRouteParamater);

  const minPrice =
    collectorListing?.saleType === 'auction'
      ? Math.max(collectorListing?.highestBid?.bidAmt || 0, collectorListing?.minBid)
      : collectorListing?.price;

  const getAuctionLabelCollector = (saleType) => {
    if (saleType === 'auction') {
      const existsBid: boolean = collectorListing.highestBid !== undefined;
      if (!isOnlyAuction) return 'Lowest bid';

      return existsBid ? 'Latest bid' : 'Minimum bid';
    }
    return isUniqueProductListing ? 'Listing Price' : 'Lowest listing price';
  };
</script>

<SkuPriceBoxButton action={href !== undefined} polling={$isPolling} on:click={() => goto(href)} let:contentWidth>
  <div class="flex justify-between gap-2">
    {#if status === 'activeSale'}
      <div>
        <div class="text-2xl from-collector-text-custom scalable-title">Active Sale</div>
        <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">
          Started {formatDate(collectorListing.startDate, contentWidth < 300 && 'M/D h:mmA')}
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl from-collector-text-custom text-right scalable-title">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-base text-right text-gray-500 from-collector-subtext-custom scalable-subtitle">
            {isUniqueProductListing ? 'Listing price' : 'Lowest listing price'}
          </div>
        </div>
      </div>
    {/if}

    {#if status === 'activeAuction'}
      <div>
        <div class="text-2xl from-collector-text-custom scalable-title">
          {isUniqueAuction ? 'Active Auction' : 'From Collector'}
        </div>
        <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">
          {isUniqueAuction
            ? `Ends ${formatDate(collectorListing.endDate, contentWidth < 300 && 'M/D h:mmA')}`
            : 'Auction Active'}
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl from-collector-text-custom text-right scalable-title">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">
            {getAuctionLabelCollector('auction')}
          </div>
        </div>
      </div>
    {/if}

    {#if status === 'upcomingAuction'}
      <div>
        <div class="text-2xl from-collector-text-custom scalable-title">Upcoming Auction</div>
        <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">
          Starts {formatDate(collectorListing.startDate, contentWidth < 300 && 'M/D h:mmA')}
        </div>
      </div>
      <div class="flex items-center justify-end">
        <div>
          <div class="text-2xl from-collector-text-custom text-right scalable-title">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">Starting Bid</div>
        </div>
      </div>
    {/if}

    {#if status === 'noneForSale'}
      <div class="text-2xl from-collector-text-custom scalable-title">From Collector</div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl from-collector-text-custom text-right scalable-title">-</div>
          <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">0 on Sale</div>
        </div>
      </div>
    {/if}
    {#if status === 'activeAuctionAndSale'}
      <div class="from-collector-text-custom">
        <div class="text-2xl scalable-title">From Collector</div>
        <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">Buy Now / Auction</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl from-collector-text-custom text-right scalable-title">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base from-collector-subtext-custom scalable-subtitle">
            {getAuctionLabelCollector(collectorListing?.saleType)}
          </div>
        </div>
      </div>
    {/if}
  </div>
</SkuPriceBoxButton>

<style lang="postcss">
  .from-collector-text-custom {
    font-weight: var(--font-weight-from-collector, 400);
    font-family: var(--font-family-from-collector, inherit);
  }
  .from-collector-subtext-custom {
    font-family: var(--subtext-font-family-from-collector, inherit);
    text-transform: var(--subtext-font-transform-from-collector, none);
    letter-spacing: var(--subtext-letter-spacing-from-collector, inherit);
  }
  .scalable-title {
    /* 0.055 ratio will scale to 1.5rem when container is 400px */
    --scale-ratio: 0.055;

    font-size: clamp(0.875rem, calc((var(--price-box-container-width) * var(--scale-ratio)) * 1px), 1.5rem);
    @apply transition-all duration-75;
  }
  .scalable-subtitle {
    /* 0.04 ratio will scale to 1rem when container is 400px */
    --scale-ratio: 0.04;

    font-size: clamp(
      0.625rem,
      calc((var(--price-box-container-width) * var(--scale-ratio)) * 1px),
      var(--subtext-font-size-from-collector, 1rem)
    );
    @apply transition-all duration-75;
  }
</style>
