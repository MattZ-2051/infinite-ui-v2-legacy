<script lang="ts">
  import type { HbarTransaction } from '$lib/features/wallet/types';
  import { mdiChevronDown } from '@mdi/js';
  import { formatDate } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import { getTransactionDescriptionStatus, getTransactionStatus } from './hedera.service';

  export let transaction: HbarTransaction;
  let expanded = false;
</script>

<div class="inline gap-1 col-span-2 md:col-span-1">
  {getTransactionDescriptionStatus(transaction.depositStatus)} by depositing
  <span class="text-black font-bold">{transaction.hbarAmount}</span>
  using
  <span class="text-black font-bold">Hbar</span>
</div>
<span class="font-bold">
  {formatDate(transaction.rawTransaction.consensusAt, 'MMMM Do, YYYY')}
</span>
<span class="hidden {transaction.depositStatus} md:inline justify-self-center">
  {getTransactionStatus(transaction.depositStatus)}
</span>
<div class="cursor-pointer justify-self-end" on:click={() => (expanded = !expanded)}>
  <Icon flip={expanded ? 'v' : false} path={mdiChevronDown} />
</div>
{#if expanded}
  <div class="col-span-4 ml-6" style="margin-top: -20px;">
    <div>Transaction ID: <span class="text-black">{transaction.rawTransaction.id}</span></div>
    <span class="flex md:hidden {transaction.depositStatus}">Deposit status: {transaction.depositStatus}</span>
  </div>
{/if}

<style lang="postcss">
  .error {
    @apply text-red-600;
  }
  .success {
    @apply text-green-600;
  }
  .pending {
    @apply text-gray-600;
  }
</style>
