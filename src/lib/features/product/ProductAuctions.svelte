<script lang="ts">
  import { handleQueryParameter } from '$util/queryParameter';
  import UserLink from '$lib/features/wallet/UserLink.svelte';
  import { Pagination, PaginationVariantDark } from '$ui/pagination';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { formatCurrency } from '$util/format';
  import { loadingAuctions } from './product.api';
  import { auctions, totalAuctions } from './product.store';

  $: p = +$page.query.get(`page`) || 1;

  const gotoPage = (event: CustomEvent) => {
    const url = handleQueryParameter({
      params: { tab: 'auctions', page: event.detail.value },
    });
    goto(url, { noscroll: true, keepfocus: true });
  };
</script>

<div class:opacity-40={$loadingAuctions}>
  {#if $totalAuctions > 0}
    <div class="mt-3">
      <div class="text-gray-500">
        {#each $auctions as auction}
          <div
            class="grid-container group grid gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
          >
            <span class="self-end font-black italic group-hover:text-white">
              <UserLink profile={auction.owner} />
            </span>
            <div class="justify-self-end">
              Bid for <span class="text-white px-1">{formatCurrency(auction.bidAmt)}</span>
            </div>
            <span class="col-span-2 justify-self-end self-start font-black italic text-sm">
              <DateFormat value={auction.createdAt} />
            </span>
          </div>
        {/each}
      </div>
    </div>
    <PaginationVariantDark>
      <Pagination perPage={5} total={$totalAuctions} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </PaginationVariantDark>
  {:else if $totalAuctions === 0 && !$loadingAuctions}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No auctions found</div>
  {/if}
</div>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
</style>
