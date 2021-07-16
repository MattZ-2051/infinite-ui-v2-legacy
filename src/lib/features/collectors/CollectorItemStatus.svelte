<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import {
    hasListing,
    hasUpcomingListing,
    hasActiveAuction,
    hasActiveSale,
    getActiveAuctionMinAllowedBid,
  } from './collectors.service';

  export let collector: CollectorProduct;
</script>

<div class="flex flex-col items-end" {...$$restProps}>
  {#if !hasListing(collector)}
    <div>Not for sale</div>
  {:else if hasUpcomingListing(collector)}
    <div>Upcoming</div>
    {#if collector.upcomingProductListing?.startDate}
      <div class="text-sm">
        Starts in
        <TimeDifference date={new Date(collector.upcomingProductListing.startDate)} />
      </div>
    {/if}
  {:else if hasActiveSale(collector)}
    <div class="flex">
      <span>Sale for</span>
      <Icon path={mdiChevronRight} color="gray" />
      <span class="highlight">{formatCurrencyWithOptionalFractionDigits(collector.activeProductListing.price)}</span>
    </div>
  {:else if hasActiveAuction(collector)}
    <div class="flex">
      <span>Bid for</span>
      <Icon path={mdiChevronRight} color="gray" />
      <span class="highlight">{formatCurrencyWithOptionalFractionDigits(getActiveAuctionMinAllowedBid(collector))}</span
      >
    </div>
    {#if collector.activeProductListing?.endDate}
      <div>
        Expires in
        <TimeDifference date={new Date(collector.activeProductListing.endDate)} />
      </div>
    {/if}
  {/if}
</div>

<style lang="postcss">
  .highlight {
    color: var(--collector-item-status-highlight, #ffffff);
  }
</style>
