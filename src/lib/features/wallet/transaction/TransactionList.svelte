<script lang="ts">
  import type { ActiveType } from '$ui/accordion/AccordionGroup.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { page } from '$app/stores';
  import { Pagination } from '$ui/pagination';
  import { gotoQueryParameters } from '$util/queryParameter';
  import TransactionItem from './item/TransactionItem.svelte';
  import TransactionDetails from './TransactionDetails.svelte';
  import { myTransactions, myTransactionsTotal, loadMyTransactionsFx } from '../wallet.store';

  function gotoPage(event: CustomEvent) {
    gotoQueryParameters({
      params: { page: event.detail.value },
    });
  }

  $: p = +$page.url.searchParams.get(`page`) || 1;

  const loading = loadMyTransactionsFx.pending;
  let active: ActiveType = [];
</script>

<div class:opacity-40={$loading}>
  {#if $myTransactionsTotal > 0}
    <AccordionGroup multiple bind:active>
      <div class="separator" />
      {#each $myTransactions as transaction (transaction._id)}
        <Accordion titleClass="py-6">
          <TransactionItem slot="title" {transaction} />
          <TransactionDetails {transaction} />
        </Accordion>
        <div class="separator" />
      {/each}
    </AccordionGroup>
    <Pagination total={$myTransactionsTotal} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
  {:else if $myTransactionsTotal === 0 && !$loading}
    <div class="no-results font-normal text-base">No transactions found</div>
  {/if}
</div>
