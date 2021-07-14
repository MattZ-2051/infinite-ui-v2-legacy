<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import TransactionItem from './TransactionItem.svelte';
  import { loadingTransactions } from './wallet.api';

  export let transactions: Transaction[] = [];
  export let totalTransactions: number;

  function gotoPage(event: CustomEvent) {
    gotoQueryParameters({
      params: { page: event.detail.value },
    });
  }

  $: p = +$page.query.get(`page`) || 1;
</script>

<div class:opacity-40={$loadingTransactions}>
  {#if totalTransactions > 0}
    <div>
      <div class="mt-3">
        {#each transactions as transaction}
          <TransactionItem {transaction} />
        {/each}
      </div>
      <Pagination total={totalTransactions} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </div>
  {:else if totalTransactions === 0 && !$loadingTransactions}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No transactions found</div>
  {/if}
</div>
