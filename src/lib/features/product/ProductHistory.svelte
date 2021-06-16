<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import DateFormat from '$ui/date/DateFormat.svelte';

  export let transactions: Transaction[];
  $: filteredTransactions = transactions
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

  const tooltipContent = (transaction: Transaction) => {
    if (transaction.type === 'purchase') {
      return `Bought for $${transaction.transactionData.cost?.totalCost?.toFixed(2)}`;
    }
    if (transaction.type === 'nft_mint') {
      return 'NFT Minted';
    }
    return 'Received NFT';
  };
</script>

<div class="text-gray-500">
  {#each filteredTransactions as transaction}
    <div
      class="grid-container group grid items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
    >
      <a href="/" class="self-end font-black italic group-hover:text-white">
        {transaction.owner?.username}
      </a>
      <div class="justify-self-end">
        {#if transaction.type === 'purchase'}
          Bought for
          <span class="text-white">${transaction.transactionData?.cost?.totalCost?.toFixed(2)}</span
          >
        {:else if transaction.type === 'nft_mint'}
          <span class="text-white">NFT Minted</span>
        {:else}
          <span class="text-white">Received Transfer</span>
        {/if}
      </div>
      <Icon
        tooltip={{ content: tooltipContent(transaction), theme: 'white' }}
        path={mdiLinkVariant}
        class="row-span-2 w-6 justify-self-center group-hover:text-white"
      />
      <span class="col-span-2 justify-self-end self-start font-black italic text-sm">
        <DateFormat value={transaction.updatedAt} />
      </span>
    </div>
  {/each}
</div>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
</style>
