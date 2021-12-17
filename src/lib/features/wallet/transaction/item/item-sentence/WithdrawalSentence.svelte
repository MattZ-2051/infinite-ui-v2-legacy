<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';

  export let transaction: Transaction;
  $: withdrawType = transaction.transactionData.withdraw.type;
</script>

{#if withdrawType === 'usdc'}
  USDC to wallet address
{:else if withdrawType === 'eth'}
  ETH to wallet address
{:else}
  Funds to bank {transaction.transactionData.withdraw.institution_name} and account ending in
  <span>{transaction.transactionData.withdraw.ach_number}</span>
{/if}
