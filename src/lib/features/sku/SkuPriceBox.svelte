<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { mdiArrowRight } from '@mdi/js';
  import { readable } from 'svelte/store';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { onOrderIntent } from '$lib/features/order/order.service';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import routes from '$lib/routes';
  import { polls } from '$lib/features/product/product.store';
  import { getActiveListings, getUpcomingListings, getLimitedAuctionCollector } from './sku.service';
  import LimitedAuctionPriceBox from './LimitedAuctionPriceBox.svelte';
  import { loadProduct } from '../product/product.api';

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
  $: upcoming = upcomingSkuListings.length > 0 && activeListings.length === 0;
  $: active = activeListings.length > 0 && sku.totalSkuListingSupplyLeft;
  $: noSale = sku.totalSkuListingSupplyLeft === 0 && activeListings.length === 0;
  $: isPolling = $polls[sku._id]?.$isActive || readable(false);
</script>

{#if collector}
  <LimitedAuctionPriceBox {collector} />
{:else if active}
  <div class="flex flex-col gap-8 px-4 py-5 bg-white font-normal">
    <div class="grid grid-cols-2 items-center gap-x-2 gap-y-4 md:gap-y-8">
      <div class="flex-grow text-black">
        <div class="text-2xl">From Creator</div>
        <div class="text-black-opacity-50">{sku?.totalSkuListingSupplyLeft} Items left</div>
      </div>
      <div class="flex text-black justify-end">
        <div>
          <div class="text-3xl text-right">{formatCurrencyWithOptionalFractionDigits(activeListings[0].price)}</div>
          <div class="text-sm text-right text-black-opacity-50">Initial Listing Price</div>
        </div>
        {#if sku.supplyType === 'fixed'}
          <div class="text-sm">
            {sku?.totalSkuListingSupplyLeft >= 0 && `(${sku?.totalSkuListingSupplyLeft} left)`}
          </div>
        {/if}
        <div class="pl-8 flex items-center" on:click={onBuy} disabled={$isPolling}>
          <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
        </div>
      </div>

      {#if totalCollectors > 0}
        <div class="border-b-2 border-gray-800 col-span-3" />

        <div class="flex-grow text-black ">
          <div class="text-2xl">From Collectors</div>
          <div class="text-black-opacity-50">Lowest Listing Price</div>
        </div>
        <div class="flex text-black justify-end">
          <div>
            <div class="text-3xl text-right ">
              {formatCurrencyWithOptionalFractionDigits(sku.minPrice, { fallback: '—' })}
            </div>
            <div class="text-sm text-right text-black-opacity-50">{`(${sku.countProductListings || 0} for sale)`}</div>
          </div>
          <div class="pl-8 flex items-center" on:click={() => window.location.replace(routes.collectors(sku._id))}>
            <Icon path={mdiArrowRight} size="2.0" color={$isPolling ? '#9DA1A8' : 'black'} />
          </div>
        </div>
        <!-- <div class="flex-grow col-span-2 md:col-span-1">
          <Button variant="tertiary" href={routes.collectors(sku._id)}>See All</Button>
        </div> -->
      {/if}
    </div>
  </div>
{:else if upcoming}
  <div class="flex flex-col gap-8 px-4 py-5">
    <div class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-2 gap-y-4 md:gap-y-8">
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">Upcoming</div>
      </div>
      <div class="flex-none text-white text-center">
        <div class="text-3xl">{formatCurrencyWithOptionalFractionDigits(upcomingSkuListings[0]?.price)}</div>
        {#if sku.supplyType !== 'variable'}
          <div class="text-sm">{upcomingSkuListings[0]?.supply || 0} items</div>
        {/if}
      </div>
      <div class="flex-grow justify-center col-span-2 text-3xl text-white md:col-span-1">
        <TimeDifference date={sku.minStartDate} />
        <div class="text-sm text-gray-400">{formatDate(sku.minStartDate)}</div>
      </div>
    </div>
  </div>
{:else if noSale}
  <div class="flex flex-col gap-8 px-4 py-5">
    <div class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-2 gap-y-4 md:gap-y-8">
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">From Creator</div>
        <div class="text-base">Initial Release</div>
      </div>
      <div class="flex-none text-white text-center justify-self-end md:justify-self-center">
        {#if sku.soldSkuListings[0]?.price}
          <div class="text-3xl">{formatCurrencyWithOptionalFractionDigits(sku.soldSkuListings[0].price)}</div>
        {/if}
        <div class="text-sm">
          {sku?.totalSkuListingSupplyLeft >= 0 && `(${sku?.totalSkuListingSupplyLeft} left)`}
        </div>
      </div>
      <div class="flex-grow col-span-2 md:col-span-1">
        <Button disabled={true} variant="tertiary">Sold Out</Button>
      </div>
      <div class="border-b-2 border-gray-800 col-span-3" />
      <div class="flex-grow text-gray-400">
        <div class="text-2xl">From Collectors</div>
        <div class="text-base">Lowest Listing Price</div>
      </div>
      <div class="flex-none text-white text-center justify-self-end md:justify-self-center">
        <div class="text-3xl">
          {sku.countProductListings ? formatCurrencyWithOptionalFractionDigits(sku.minPrice) : '—'}
        </div>
        <div class="text-sm">{`(${sku.countProductListings} ${sku.countProductListings ? 'for' : 'on'} sale)`}</div>
      </div>
      <div class="flex-grow col-span-2 md:col-span-1">
        <Button variant="tertiary" href={routes.collectors(sku._id)}>See All</Button>
      </div>
    </div>
  </div>
{/if}
