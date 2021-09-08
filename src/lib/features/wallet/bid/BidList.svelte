<script lang="ts">
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import { myBids, myBidsTotal, loadMyBidsFx } from '../wallet.store';
  import BidItem from './BidItem.svelte';

  function gotoPage(event: CustomEvent) {
    gotoQueryParameters({
      params: { page: event.detail.value },
    });
  }

  $: p = +$page.query.get(`page`) || 1;

  const loading = loadMyBidsFx.pending;
</script>

<div class:opacity-40={$loading}>
  {#if $myBidsTotal > 0}
    <div class="separator" />
    {#each $myBids as bid}
      <BidItem {bid} />
      <div class="separator" />
    {/each}
    <Pagination total={$myBidsTotal} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
  {:else if $myBidsTotal === 0 && !$loading}
    <div class="no-results">No active bids found</div>
  {/if}
</div>
