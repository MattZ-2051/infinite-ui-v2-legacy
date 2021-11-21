<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { hasActiveAuction } from '../sku-auction.service';
  import { maxPlacedBid } from '../sku-auction.store';
  import BidForm from '../auction/BidForm.svelte';
  import { onBid } from '../actions/product-actions.service';
  import { getBiddingFee } from '../sku-auction.fee';

  export let sku: Sku;

  $: showActiveAuction = hasActiveAuction(sku);
  $: activeProductListing = sku?.activeSkuListings?.[0];
</script>

<div {...$$restProps}>
  {#if showActiveAuction}
    <BidForm
      {sku}
      maxPlacedBid={$maxPlacedBid}
      listing={activeProductListing}
      fee={getBiddingFee(sku)}
      on:place-bid={(event) => onBid(event.detail.amount, sku)}
    />
  {/if}
</div>
