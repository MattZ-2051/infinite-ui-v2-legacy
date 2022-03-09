<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { onOrderIntent } from '$lib/features/order/order.service';
  import { onSignIn, user } from '$lib/user';
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import {
    getActiveListings,
    getUpcomingListings,
    getLimitedAuctionCollector,
    getLowestProductListing,
    getLowestUpcomingProductListing,
  } from '../sku.service';
  import { loadProduct } from '../../product/product.api';
  import FromCreator from './button/FromCreator.svelte';
  import FromCollectors from './button/FromCollectors.svelte';
  import LimitedAuction from './button/LimitedAuction.svelte';

  export let sku: Sku;
  export let totalCollectors: number;
  export let collectors: CollectorProduct[];

  async function onBuy() {
    const goToSkuAuctionPage = active && activeListings?.[0]?.saleType === 'auction';
    const redirectToLogin = !$user && sku.mintPolicy.transaction === 'later';

    if (redirectToLogin) {
      onSignIn();
    } else if (goToSkuAuctionPage) {
      goto(routes.skuAuction(sku._id));
    } else if (activeListings[0].product) {
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
  $: noSale = sku.activeSkuListings?.length === 0 && sku.upcomingSkuListings?.length === 0;
  $: noCollectorSales = sku.activeProductListings?.length === 0 && sku.upcomingProductListings?.length === 0;
  $: ethSkuSale = sku?.currency === 'ETH' && sku.skuListings?.[0]?.saleType === 'fixed';
  $: lowestActivePriceListing = getLowestProductListing(sku);
  $: lowestUpcomingPriceListing = getLowestUpcomingProductListing(sku);
  $: isActiveSale = lowestActivePriceListing?.saleType === 'fixed' && lowestActivePriceListing?.status === 'active';
  $: isActiveAuction =
    lowestActivePriceListing?.saleType === 'auction' && lowestActivePriceListing?.status === 'active';
  $: isUpcomingAuction =
    lowestUpcomingPriceListing?.saleType === 'auction' && lowestUpcomingPriceListing?.status === 'upcoming';

  $: notMinted = sku.circulatingSupply === 0;
  $: hasActiveAuctionListing = sku.activeProductListings?.some((listing) => {
    return listing?.saleType === 'auction' && listing?.status === 'active';
  });

  $: hasActiveFixedListing = sku.activeProductListings?.some((listing) => {
    return listing?.saleType === 'fixed' && listing?.status === 'active';
  });
</script>

<div class="flex flex-col">
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
  {:else if notMinted}
    <FromCreator state="notMinted" {sku} {onBuy} />
  {/if}

  {#if totalCollectors > 0}
    <div style="border-top:var(--sku-price-box-border-top, 1px solid black);">
      {#if hasActiveAuctionListing && hasActiveFixedListing}
        <FromCollectors {sku} collectorListing={lowestActivePriceListing} status="activeAuctionAndSale" />
      {:else if isActiveSale}
        <FromCollectors {sku} collectorListing={lowestActivePriceListing} status="activeSale" />
      {:else if isActiveAuction}
        <FromCollectors {sku} collectorListing={lowestActivePriceListing} status="activeAuction" />
      {:else if isUpcomingAuction}
        <FromCollectors {sku} collectorListing={lowestUpcomingPriceListing} status="upcomingAuction" />
      {:else if ethSkuSale}
        <FromCollectors {sku} collectorListing={lowestUpcomingPriceListing} status="ethSkuSale" />
      {:else if noCollectorSales}
        <FromCollectors {sku} collectorListing={lowestActivePriceListing} status="noneForSale" />
      {/if}
    </div>
  {/if}
</div>

<style>
  div {
    background-color: var(--sku-price-box-bg-color);
  }
</style>
