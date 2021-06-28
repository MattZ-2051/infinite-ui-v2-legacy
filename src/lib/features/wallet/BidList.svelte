<script lang="ts">
  import type { Bid } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import Pagination from '$ui/pagination/Pagination.svelte';
  import { goto } from '$app/navigation';
  import BidItem from './BidItem.svelte';

  export let bids: Bid[];
  export let total: number;

  function gotoPage(event: CustomEvent) {
    goto(`/wallet?tab=bids&page=${event.detail.value}`);
  }

  $: p = +$page.query.get(`page`) || 1;
</script>

<div>
  <div class="mt-3">
    {#each bids as bid}
      <div
        class="cursor-pointer"
        on:click={() => {
          goto(`/product/${bid.listing.product._id}`);
        }}
      >
        <BidItem {bid} />
      </div>
    {/each}
  </div>
  <Pagination {total} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
</div>
