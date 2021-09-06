<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { formatDate, formatCurrency } from '$util/format';

  import TransactionItemLogo from './TransactionItemLogo.svelte';
  import TransactionItemSentence from './TransactionItemSentence.svelte';

  export let transaction: Transaction;

  $: ({ type, status, transactionData } = transaction);
  $: typeText = type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');

  const getCurrencyFormatted = (): string => {
    switch (type) {
      case 'royalty_fee':
        return `+${formatCurrency(transactionData.cost?.royaltyFee)}`;
      case 'sale':
        return `+${formatCurrency(transactionData.cost?.finalPayout)}`;
      case 'deposit':
        return `+${formatCurrency(transactionData.deposit?.amount)}`;
      case 'purchase':
        return `-${formatCurrency(transactionData.cost?.totalCost)}`;
      case 'withdrawal':
        return `-${formatCurrency(transactionData.withdraw?.amount)}`;
    }
    return '';
  };
</script>

<div class="flex items-center gap-x-4">
  <div class="hidden lg:block">
    <TransactionItemLogo {transaction} />
  </div>

  <div class="flex flex-1 items-center">
    <div class="flex flex-col w-full mr-4">
      <div class="flex justify-between">
        <span class="text-white-opacity-30 text-sm">{typeText}</span>
        <span class="whitespace-nowrap flex items-center text-default" class:line-through={status === 'error'}>
          {getCurrencyFormatted()}
        </span>
      </div>

      <div class="flex justify-between">
        <TransactionItemSentence {transaction} />
        <span class="text-white-opacity-40 text-sm">{formatDate(transaction.createdAt, 'MMMM Do, YYYY ')}</span>
      </div>
    </div>
  </div>
</div>
