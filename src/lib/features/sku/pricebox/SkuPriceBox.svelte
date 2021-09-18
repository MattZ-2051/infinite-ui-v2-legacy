<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { onOrderIntent } from '$lib/features/order/order.service';
  import {
    getActiveListings,
    getUpcomingListings,
    getLimitedAuctionCollector,
    getLowestActiveListing,
  } from '../sku.service';
  import { loadProduct } from '../../product/product.api';
  import FromCreator from './button/FromCreator.svelte';
  import FromCollectors from './button/FromCollectors.svelte';
  import LimitedAuction from './button/LimitedAuction.svelte';

  export let sku: Sku;
  export let totalCollectors: number;
  export let collectors: CollectorProduct[];

  async function onBuy() {
    if (activeListings[0].product) {
      const product = await loadProduct({ id: activeListings[0].product });
      return onOrderIntent({ sku, listing: activeListings[0], product });
    } else {
      return onOrderIntent({ sku, listing: activeListings[0] });
    }
  }

  $: activeListings = getActiveListings(sku);
  $: upcomingSkuListings = getUpcomingListings(sku);
  $: collector = getLimitedAuctionCollector(sku, collectors);
  $: upcoming =
    upcomingSkuListings.length > 0 && activeListings.length === 0 && upcomingSkuListings[0]?.saleType !== 'giveaway';
  $: active = activeListings.length > 0 && sku.totalSupplyLeft && activeListings?.[0]?.saleType !== 'giveaway';
  $: activeNftGiveAway = activeListings[0]?.saleType === 'giveaway';
  $: upcomingNftGiveAway = upcomingSkuListings[0]?.saleType === 'giveaway';
  $: noSale = sku.totalSupplyLeft === 0 && sku.activeSkuListings?.length === 0 && sku.upcomingSkuListings?.length === 0;
  $: noCollectorSales = sku.activeProductListings?.length === 0 && sku.upcomingProductListings?.length === 0;
  $: lowestPriceListingCollector = getLowestActiveListing(collectors);
  $: isActiveSale =
    lowestPriceListingCollector?.listing?.saleType === 'fixed' &&
    lowestPriceListingCollector?.listing?.status === 'active';
  $: isActiveAuction =
    lowestPriceListingCollector?.listing?.saleType === 'auction' &&
    lowestPriceListingCollector?.listing?.status === 'active';
  $: isUpcomingAuction =
    lowestPriceListingCollector?.listing?.saleType === 'auction' &&
    lowestPriceListingCollector?.listing?.status === 'upcoming';
</script>

<ThemeContext id="sku-price-box">
  <div class="flex flex-col divide-y divide-black">
    {#if collector}
      <LimitedAuction {collector} />
    {:else if active}
      <FromCreator {sku} state="active" {activeListings} {onBuy} />
    {:else if upcoming}
      <FromCreator {sku} state="upcoming" {upcomingSkuListings} {onBuy} />
    {:else if upcomingNftGiveAway}
      <FromCreator {sku} state="upcomingNftGiveAway" {upcomingSkuListings} {onBuy} />
    {:else if activeNftGiveAway}
      <FromCreator {sku} state="activeNftGiveAway" {activeListings} {onBuy} />
    {:else if noSale}
      <FromCreator state="noSale" {sku} {onBuy} />
    {/if}

    {#if totalCollectors > 0}
      {#if isActiveSale}
        <FromCollectors {sku} collector={lowestPriceListingCollector} status="activeSale" />
      {:else if isActiveAuction}
        <FromCollectors {sku} collector={lowestPriceListingCollector} status="activeAuction" />
      {:else if isUpcomingAuction}
        <FromCollectors {sku} collector={lowestPriceListingCollector} status="upcomingAuction" />
      {:else if noCollectorSales}
        <FromCollectors {sku} collector={lowestPriceListingCollector} status="noneForSale" />
      {/if}
    {/if}
  </div>
</ThemeContext>

<style>
  div {
    background-color: var(--sku-price-box-bg-color);
  }
</style>
