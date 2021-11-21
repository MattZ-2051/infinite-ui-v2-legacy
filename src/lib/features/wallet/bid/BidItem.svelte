<script lang="ts">
  import type { Bid } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import routes from '$project/routes';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';

  export let bid: Bid;
  $: bidExceed = bid.listing.highestBid.bidAmt > bid.bidAmt;
  $: href = bid.listing.type === 'sku' ? routes.skuAuction(bid.listing.sku) : routes.product(bid.listing.product._id);
  $: title = bid.listing.type === 'sku' ? bid.sku.name : `${bid.sku.name} (#${bid.listing.product.serialNumber})`;
</script>

<a {href} class="py-6 flex li-style justify-between font-medium">
  <div class="flex flex-col">
    <span class="text-sm text-gray-400">Bid</span>
    <span class="flex gap-1"
      >{title} <span class="text-gray-400">by</span>
      {bid.listing.issuer.username}</span
    >
  </div>
  <div class="flex items-center gap-6">
    <div>
      <div class="text-right">
        <span>You bid</span>
        {#if bidExceed}
          <span>{formatCurrency(bid.bidAmt, { currency: bid.sku.currency })} ></span>
          <span class="text-red-700"
            >Bid exceeded > {formatCurrency(bid.listing.highestBid.bidAmt, { currency: bid.sku.currency })}</span
          >
        {:else}
          <span>></span>
          <span class="px-1">{formatCurrency(bid.bidAmt, { currency: bid.sku.currency })}</span>
        {/if}
      </div>
      <div class="text-right">
        <span class="text-sm text-gray-400">Expires in <TimeDifference date={new Date(bid.listing.endDate)} /></span>
      </div>
    </div>
    <Icon path={mdiChevronRight} />
  </div>
</a>
