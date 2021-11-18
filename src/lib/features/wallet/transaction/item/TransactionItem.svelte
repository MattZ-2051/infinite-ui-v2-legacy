<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { formatDate, formatEthCurrency, formatCurrency, capitalizeFirstLetter } from '$util/format';

  import TransactionItemLogo from './TransactionItemLogo.svelte';
  import TransactionItemSentence from './TransactionItemSentence.svelte';

  export let transaction: Transaction;

  $: ({ type, status, transactionData } = transaction);
  $: typeText = capitalizeFirstLetter(type);

  const getCurrencyFormatted = (): string => {
    const isEthDeposit = transactionData.deposit?.balanceCurrency === 'ETH';
    const isEthPurchase = transactionData.cost?.currency === 'ETH';
    const depositAmount = isEthDeposit
      ? formatEthCurrency(transactionData.deposit?.amount, 'symbol')
      : `+${formatCurrency(transactionData.deposit?.amount)}`;
    const purchaseAmount = isEthPurchase
      ? `- ${formatEthCurrency(transactionData.cost?.totalCost, 'symbol')}`
      : `- ${formatCurrency(transactionData.cost?.totalCost)}`;

    switch (type) {
      case 'royalty_fee':
        return `+${formatCurrency(transactionData.cost?.royaltyFee)}`;
      case 'sale':
        return `+${formatCurrency(transactionData.cost?.finalPayout)}`;
      case 'deposit':
        return `${depositAmount}`;
      case 'purchase':
        return `${purchaseAmount}`;
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
