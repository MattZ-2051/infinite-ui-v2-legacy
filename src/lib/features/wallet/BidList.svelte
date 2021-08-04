<script lang="ts">
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import { goto } from '$app/navigation';
  import routes from '$lib/routes';
  import BidItem from './BidItem.svelte';
  import { myBids, myBidsTotal, loadMyBidsFx } from './wallet.store';

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
    <div>
      <div class="mt-3">
        {#each $myBids as bid}
          <div
            class="cursor-pointer"
            on:click={() => {
              goto(routes.product(bid.listing.product._id));
            }}
          >
            <BidItem {bid} />
          </div>
        {/each}
      </div>
      <Pagination total={$myBidsTotal} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </div>
  {:else if $myBidsTotal === 0 && !$loading}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No active bids found</div>
  {/if}
</div>
