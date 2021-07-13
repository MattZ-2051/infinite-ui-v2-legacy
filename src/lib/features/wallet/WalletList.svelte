<script lang="ts">
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import { TabHeader } from '$ui/tabs';
  import { handleQueryParameter } from '$util/queryParameter';
  import TransactionList from './TransactionList.svelte';
  import BidList from './BidList.svelte';
  import Sort from './Sort.svelte';

  export let tab: 'transactions' | 'bids';
  export let transactions: Transaction[] = [];
  export let bids: Bid[] = [];
  export let totalTransactions: number;
  export let totalBids: number;

  function redirect(_tab: 'transactions' | 'bids') {
    const url = handleQueryParameter({
      params: { tab: _tab, page: false },
    });
    goto(url);
  }

  const sort = (event: CustomEvent) => {
    const url = handleQueryParameter({
      params: { sortBy: `${event.detail.value}:${event.detail.order}` },
    });
    goto(url);
  };
</script>

<nav class="text-xl md:text-2xl flex justify-between">
  <ul class="flex gap-10">
    <TabHeader on:click={() => redirect('transactions')} active={tab === 'transactions'} class="pb-5"
      >Latest transactions</TabHeader
    >
    <TabHeader on:click={() => redirect('bids')} active={tab === 'bids'} class="pb-5">Active Bids</TabHeader>
  </ul>
  <div class="justify-self-end self-center">
    <Sort on:select={sort} />
  </div>
</nav>

{#if tab === 'transactions'}
  <TransactionList {transactions} {totalTransactions} />
{/if}

{#if tab === 'bids'}
  <BidList {bids} {totalBids} />
{/if}

<style>
  nav {
    box-shadow: inset 0 -2px #ebebeb;
  }
</style>
