<script lang="ts">
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import { TabHeader } from '$ui/tabs';
  import TransactionList from './TransactionList.svelte';
  import BidList from './BidList.svelte';

  export let tab: 'transactions' | 'bids';
  export let transactions: Transaction[] = [];
  export let bids: Bid[] = [];
  export let total: number;

  function redirect(_tab: 'transactions' | 'bids') {
    tab = _tab;
    goto(`/wallet?tab=${tab}`);
  }
</script>

<nav class="text-2xl">
  <ul class="flex gap-10">
    <TabHeader on:click={() => redirect('transactions')} active={tab === 'transactions'} class="pb-5"
      >Latest transactions</TabHeader
    >
    <TabHeader on:click={() => redirect('bids')} active={tab === 'bids'} class="pb-5">Active Bids</TabHeader>
  </ul>
</nav>

{#if tab === 'transactions'}
  <TransactionList {transactions} {total} />
{/if}

{#if tab === 'bids'}
  <BidList {bids} {total} />
{/if}

<style>
  nav {
    box-shadow: inset 0 -2px #ebebeb;
  }
</style>
