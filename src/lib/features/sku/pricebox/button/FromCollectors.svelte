<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku, Listing } from '$lib/sku-item/types';
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
    | 'ethSkuSale'
    | '';
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let status: FromCollectorStatus = '';
  export let sku: Sku;
  export let collectorListing: Listing;

  const isOnlyAuction = sku?.activeAuctionProductListingsCounter === 1;
  const isNoAuctions = sku?.activeAuctionProductListingsCounter !== 0;
  const isOnlyBuyNow = sku?.activeBuyNowProductListingsCounter === 1;
  const isNoBuyNows = sku?.activeBuyNowProductListingsCounter !== 0;

  const isUniqueAuction = isOnlyAuction && isNoBuyNows;
  const isUniqueBuyNow = isOnlyBuyNow && isNoAuctions;
  const isUniqueProductListing = isUniqueAuction || isUniqueBuyNow;
  const href = isUniqueProductListing
    ? routes.product(collectorListing.product)
    : routes.collectors(sku._id, '?saleType=all');

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

<SkuPriceBoxButton {href} polling={$isPolling}>
  <div class="flex justify-between gap-2">
    {#if status === 'activeSale'}
      <div>
        <div class="text-2xl">Active Sale</div>
        <div class="text-gray-500 text-base">Started {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl text-right">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-base text-right text-gray-500 ">
            {isUniqueProductListing ? 'Listing price' : 'Lowest listing price'}
          </div>
        </div>
      </div>
    {/if}

    {#if status === 'activeAuction'}
      <div>
        <div class="text-2xl">{isUniqueAuction ? 'Active Auction' : 'From Collector'}</div>
        <div class="text-gray-500 text-base">
          {isUniqueAuction ? `Ends ${formatDate(collectorListing.endDate)}` : 'Auction Active'}
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl text-right">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base">
            {getAuctionLabelCollector('auction')}
          </div>
        </div>
      </div>
    {/if}

    {#if status === 'upcomingAuction'}
      <div>
        <div class="text-2xl">Upcoming Auction</div>
        <div class="text-gray-500 text-base">Starts {formatDate(collectorListing.startDate)}</div>
      </div>
      <div class="flex items-center justify-end">
        <div>
          <div class="text-2xl text-right">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base">Starting Bid</div>
        </div>
      </div>
    {/if}

    {#if status === 'noneForSale'}
      <div class="text-2xl">From Collector</div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl text-right">-</div>
          <div class="text-gray-500 text-base">0 on Sale</div>
        </div>
      </div>
    {/if}
    {#if status === 'activeAuctionAndSale'}
      <div>
        <div class="text-2xl">From Collector</div>
        <div class="text-gray-500 text-base">Buy Now / Auction</div>
      </div>
      <div class="flex justify-end items-center">
        <div>
          <div class="text-2xl text-right">
            {formatCurrencyWithOptionalFractionDigits(minPrice, { currency: sku.currency })}
          </div>
          <div class="text-gray-500 text-base">
            {getAuctionLabelCollector(collectorListing?.saleType)}
          </div>
        </div>
      </div>
    {/if}
    {#if status === 'ethSkuSale'}
      <div class="text-2xl">From Collector</div>
      <div class="flex justify-end items-center" />
    {/if}
  </div>
</SkuPriceBoxButton>
