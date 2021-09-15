<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import copy from 'clipboard-copy';
  import { mdiContentCopy } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatDate, capitalizeFirstLetter } from '$util/format';

  export let transaction: Transaction;

  const details = [
    { label: 'Transaction Type', value: capitalizeFirstLetter(transaction.type) },
    { label: 'Transaction Status', value: capitalizeFirstLetter(transaction.status) },
    { label: 'Date', value: formatDate(transaction.createdAt, `MMM D, YYYY`) },
    { label: 'Time', value: formatDate(transaction.createdAt, `hh:mm A`) },
  ];
</script>

<div class="py-4 border-t border-b border-gray-500">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-2">
      <div class="label">Transaction ID</div>
      <div>{transaction._id}</div>
    </div>
    <button type="button" class="p-2.5 rounded-full" on:click={() => copy(transaction._id)}>
      <Icon path={mdiContentCopy} flip="h" />
    </button>
  </div>
</div>

<div class="flex flex-col gap-4 mt-4">
  {#each details as detail}
    <div class="flex items-center justify-between">
      <div class="label">{detail.label}</div>
      <div>{detail.value}</div>
    </div>
  {/each}
</div>

<style lang="postcss">
  .label {
    @apply text-gray-400;
  }

  button {
    background: var(--transaction-details-copy-bg, theme('colors.gray.400'));
  }
</style>
