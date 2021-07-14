<script lang="ts">
  import type { Bid } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import { goto } from '$app/navigation';
  import BidItem from './BidItem.svelte';
  import { loadingBids } from './wallet.api';

  export let bids: Bid[];
  export let totalBids: number;

  function gotoPage(event: CustomEvent) {
    gotoQueryParameters({
      params: { page: event.detail.value },
    });
  }

  $: p = +$page.query.get(`page`) || 1;
</script>

<div class:opacity-40={$loadingBids}>
  {#if totalBids > 0}
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
      <Pagination total={totalBids} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </div>
  {:else if totalBids === 0 && !$loadingBids}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No active bids found</div>
  {/if}
</div>
