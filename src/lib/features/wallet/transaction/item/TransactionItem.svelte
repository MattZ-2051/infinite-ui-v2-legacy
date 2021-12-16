<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { formatDate, formatCurrency, capitalizeFirstLetter } from '$util/format';

  import TransactionItemLogo from './TransactionItemLogo.svelte';
  import TransactionItemSentence from './TransactionItemSentence.svelte';

  export let transaction: Transaction;

  $: ({ type, status, transactionData } = transaction);
  $: typeText = capitalizeFirstLetter(type);

  const getCurrencyFormatted = (): string => {
    const depositAmount = `+${formatCurrency(transactionData.deposit?.amount, {
      currency: transactionData.deposit?.balanceCurrency,
    })}`;
    const purchaseAmount = `- ${formatCurrency(transactionData.cost?.totalCost, {
      currency: transactionData.cost?.currency,
    })}`;

    switch (type) {
      case 'royalty_fee':
        return `+${formatCurrency(
          transactionData.cost?.royaltyFee,
          transaction.transactionData.cost?.currency === 'ETH' ? { currency: 'ETH' } : {}
        )}`;
      case 'sale':
        return `+${formatCurrency(
          transactionData.cost?.finalPayout,
          transaction.transactionData.cost?.currency === 'ETH' ? { currency: 'ETH' } : {}
        )}`;
      case 'deposit':
        return `${depositAmount}`;
      case 'purchase':
        return `${purchaseAmount}`;
      case 'withdrawal':
        return `-${formatCurrency(
          transactionData.withdraw?.amount,
          transactionData?.withdraw?.type === 'eth' ? { currency: 'ETH' } : {}
        )}`;
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
        <span class="text-gray-300 text-sm">{typeText}</span>
        <span class="whitespace-nowrap flex items-center text-default" class:line-through={status === 'error'}>
          {getCurrencyFormatted()}
        </span>
      </div>

      <div class="flex justify-between">
        <TransactionItemSentence {transaction} />
        <span class="text-gray-400 text-sm">{formatDate(transaction.createdAt, 'MMM D, YYYY ')}</span>
      </div>
    </div>
  </div>
</div>
