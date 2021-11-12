<script lang="ts">
  import type { Bid } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import routes from '$project/routes';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';

  export let bid: Bid;
  $: bidExceed = bid.listing.highestBid.bidAmt > bid.bidAmt;
</script>

<a href={routes.product(bid.listing.product._id)} class="py-6 flex li-style justify-between font-medium">
  <div class="flex flex-col">
    <span class="text-sm text-gray-400">Bid</span>
    <span class="flex gap-1"
      >{bid.sku.name} (#{bid.listing.product.serialNumber}) <span class="text-gray-400">by</span>
      {bid.listing.issuer.username}</span
    >
  </div>
  <div class="flex items-center gap-6">
    <div>
      <div class="text-right">
        <span>You bid</span>
        {#if bidExceed}
          <span>{formatCurrency(bid.bidAmt)} ></span>
          <span class="text-red-700">Bid exceeded > {formatCurrency(bid.listing.highestBid.bidAmt)}</span>
        {:else}
          <span>></span>
          <span class="px-1">{formatCurrency(bid.bidAmt)}</span>
        {/if}
      </div>
      <div class="text-right">
        <span class="text-sm text-gray-400">Expires in <TimeDifference date={new Date(bid.listing.endDate)} /></span>
      </div>
    </div>
    <Icon path={mdiChevronRight} />
  </div>
</a>
