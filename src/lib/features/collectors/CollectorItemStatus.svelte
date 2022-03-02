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
  export let currency: 'USD' | 'ETH';
</script>

<div class={'flex flex-col items-start sm:items-end'} {...$$restProps}>
  {#if !hasListing(collector)}
    <div>Not for sale</div>
  {:else if hasUpcomingListing(collector)}
    <div>Upcoming</div>
    {#if collector.upcomingProductListing?.startDate}
      <div class="text-sm subtitle">
        Starts in
        <TimeDifference date={new Date(collector.upcomingProductListing.startDate)} />
      </div>
    {/if}
  {:else if hasActiveSale(collector)}
    <div class="flex items-center">
      <span>Sale for</span>
      <Icon path={mdiChevronRight} color="gray" />
      <span class="highlight">
        {formatCurrencyWithOptionalFractionDigits(collector.activeProductListing.price, { currency })}
      </span>
    </div>
  {:else if hasActiveAuction(collector)}
    <div class="flex items-center">
      <span>Bid for</span>
      <Icon path={mdiChevronRight} color="gray" />
      <span class="highlight">
        {formatCurrencyWithOptionalFractionDigits(getActiveAuctionMinAllowedBid(collector), { currency })}
      </span>
    </div>
    {#if collector.activeProductListing?.endDate}
      <div class="text-sm subtitle">
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

  .subtitle {
    color: var(--item-status-information-subtitle, rgba(255, 255, 255, 0.4));
    font-size: var(--collector-list-description-small-text-size-mobile, 0.875rem);
  }

  @screen sm {
    .subtitle {
      font-size: var(--collector-list-description-small-text-size, 0.875rem);
    }
  }
</style>
