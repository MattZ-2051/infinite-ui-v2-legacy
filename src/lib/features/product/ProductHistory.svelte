<script lang="ts">
  import { mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { handleQueryParameter } from '$util/queryParameter';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { page } from '$app/stores';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { Pagination, PaginationVariantDark } from '$ui/pagination';
  import { goto } from '$app/navigation';
  import { loadingTransactions } from './product.api';
  import { transactions, totalTransactions } from './product.store';

  $: filteredTransactions = $transactions
    .filter(
      (item) =>
        item.status !== 'error' &&
        item.status !== 'pending' &&
        ['nft_transfer_manual', 'purchase', 'nft_mint'].includes(item.type)
    )
    .sort((a, b) => {
      if (a.type === 'nft_mint') {
        return 1;
      }
      if (b.type === 'nft_mint') {
        return -1;
      }
      return a.updatedAt < b.updatedAt ? -1 : 1;
    });

  $: p = +$page.query.get(`page`) || 1;

  const gotoPage = (event: CustomEvent) => {
    const url = handleQueryParameter({
      params: { tab: 'history', page: event.detail.value },
    });
    goto(url, { noscroll: true, keepfocus: true });
  };
</script>

<div class:opacity-40={$loadingTransactions}>
  {#if $totalTransactions > 0}
    <div class="text-gray-500">
      {#each filteredTransactions as transaction}
        <div
          class="grid-container group grid gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
        >
          <a href="/collection/{transaction.owner?.username}" class="self-end font-black italic group-hover:text-white">
            {transaction.owner?.username}
          </a>
          <div class="justify-self-end">
            {#if transaction.type === 'purchase'}
              Bought for
              <span class="text-white"
                >{formatCurrencyWithOptionalFractionDigits(transaction.transactionData?.cost?.totalCost)}</span
              >
            {:else if transaction.type === 'nft_mint'}
              <span class="text-white">NFT Minted</span>
            {:else}
              <span class="text-white">Received Transfer</span>
            {/if}
          </div>
          <a href={transaction?.transactionData?.explorerLink} target="_blank" rel="noreferrer" class="row-span-2">
            <Icon
              tooltip={{ content: 'View transaction', theme: 'white' }}
              path={mdiLinkVariant}
              class="w-6 justify-self-center group-hover:text-white"
            />
          </a>
          <span class="col-span-2 justify-self-end self-start font-black italic text-sm">
            <DateFormat value={transaction.updatedAt} />
          </span>
        </div>
      {/each}
    </div>
    <PaginationVariantDark>
      <Pagination perPage={5} total={$totalTransactions} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
    </PaginationVariantDark>
  {:else if $totalTransactions === 0 && !$loadingTransactions}
    <div class="flex justify-center items-center text-2xl text-gray-400 pt-20">No records found</div>
  {/if}
</div>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
</style>
