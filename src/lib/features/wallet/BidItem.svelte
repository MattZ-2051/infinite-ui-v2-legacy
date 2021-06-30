<script lang="ts">
  import type { Bid } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';

  export let bid: Bid;
</script>

<div class="py-6 flex li-style justify-between font-medium">
  <div class="flex flex-col">
    <span class="flex items-center gap-1">
      {bid.sku.name} | #{bid.listing.product.serialNumber}
      {#if bid.sku.redeemable}
        <IconRedeem size="0.8" class="text-gray-400 p-0.5" />
      {/if}
    </span>
    <span class="message italic text-sm font-black">{bid.listing.issuer.username}</span>
  </div>
  <div class="flex items-center gap-6">
    <div>
      <div class="text-right">
        <span class="message">You bid ></span><span class="px-2">{formatCurrency(bid.bidAmt)}</span>
      </div>
      <div class="message font-black italic">
        <span>Expires in </span><TimeDifference date={new Date(bid.listing.endDate)} />
      </div>
    </div>
    <Icon path={mdiChevronRight} />
  </div>
</div>

<style>
  .message {
    color: #9e9e9e;
  }
</style>
