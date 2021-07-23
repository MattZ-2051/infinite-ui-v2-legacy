<script lang="ts">
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import TransactionItem from './TransactionItem.svelte';
  import { myTransactions, myTransactionsTotal, loadMyTransactionsFx } from './wallet.store';

  function gotoPage(event: CustomEvent) {
    gotoQueryParameters({
      params: { page: event.detail.value },
    });
  }

  $: p = +$page.query.get(`page`) || 1;

  const loading = loadMyTransactionsFx.pending;
</script>

<div class:opacity-40={$loading}>
  {#if $myTransactionsTotal > 0}
    <div>
      <div class="mt-3">
        {#each $myTransactions as transaction}
          <TransactionItem {transaction} />
        {/each}
      </div>
      <Pagination total={$myTransactionsTotal} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </div>
  {:else if $myTransactionsTotal === 0 && !$loading}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No transactions found</div>
  {/if}
</div>
