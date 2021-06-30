<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Pagination } from '$ui/pagination';
  import TransactionItem from './TransactionItem.svelte';

  export let transactions: Transaction[] = [];
  export let total: number;

  function gotoPage(event: CustomEvent) {
    goto(`/u/wallet?tab=transactions&page=${event.detail.value}`);
  }

  $: p = +$page.query.get(`page`) || 1;
</script>

<div>
  <div class="mt-3">
    {#each transactions as transaction}
      <TransactionItem {transaction} />
    {/each}
  </div>
  <Pagination {total} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
</div>
