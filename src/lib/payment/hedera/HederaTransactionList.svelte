<script lang="ts">
  import type { HbarTransaction } from '$lib/features/wallet/types';
  import HederaTransactionItem from './HederaTransactionItem.svelte';

  export let transactions: HbarTransaction[];
</script>

<div class="flex flex-grow justify-between border-b border-gray-300 font-bold pb-2 text-gray-600">
  <span>New Deposits</span>
  <span>{transactions.length > 0 ? transactions.length : 'No transactions found'}</span>
</div>
<div class="grid grid-cols-4 grid-container justify-items-start gap-x-2 gap-y-6 text-gray-500 md:gap-x-10">
  {#each transactions as transaction}
    <HederaTransactionItem {transaction} />
  {/each}
</div>

<style lang="postcss">
  .grid-container {
    grid-template-columns: auto auto auto 35px;
  }
</style>
