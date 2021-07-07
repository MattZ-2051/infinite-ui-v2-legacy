<script lang="ts">
  import { mdiChevronRight, mdiAccountCircle } from '@mdi/js';
  import type { Collector } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

  export let collector: Collector;
  $: noSale = !collector.activeProductListing && !collector.upcomingProductListing;
  $: upcoming = !!collector.upcomingProductListing;
  $: activeAuction = collector?.activeProductListing?.saleType === 'auction';
  $: activeSale = collector?.activeProductListing?.saleType !== 'auction';
</script>

<a href={`/product/${collector._id}`} class="flex justify-between">
  <div class="flex gap-6">
    {#if collector?.owner?.profilePhotoUrl}
      <img
        class="w-12 h-12 border rounded-full"
        src={collector.owner.profilePhotoUrl}
        alt=""
        on:error={() => {
          collector.owner.profilePhotoUrl = undefined;
        }}
        loading="lazy"
      />
    {:else}
      <Icon path={mdiAccountCircle} size="2" />
    {/if}
    <div>
      <div>
        #{collector.serialNumber}
      </div>
      <div class="text-gray-400">
        {collector.owner.username}
      </div>
    </div>
  </div>
  <div class="flex items-center gap-5 justify-self-end">
    <div class="items-center flex" class:flex-col={activeAuction}>
      {#if noSale}
        <span class="text-gray-400">Not for sale</span>
      {:else if upcoming}
        <span class="text-gray-400">Upcoming</span>
        <Icon path={mdiChevronRight} color="gray" size="0.8" />
        <TimeDifference date={new Date()} />
      {:else if activeSale}
        <span class="text-gray-400">On Sale for</span>
        <Icon path={mdiChevronRight} color="gray" size="0.8" />
        <span>{formatCurrencyWithOptionalFractionDigits(collector.activeProductListing?.price)}</span>
      {:else if activeAuction}
        <div class="flex items-center">
          <span class="text-gray-400">Bid for</span>
          <Icon path={mdiChevronRight} color="gray" size="0.8" />
          <span>{formatCurrencyWithOptionalFractionDigits(collector?.activeProductListing?.minBid)}</span>
        </div>
        <div>
          Expires in
          <TimeDifference date={new Date()} />
        </div>
      {/if}
    </div>
    <Icon path={mdiChevronRight} color="black" class="justify-self-end" />
  </div>
</a>
<div class="w-full border-b border-gray-100" />
