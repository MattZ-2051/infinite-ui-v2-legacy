<script lang="ts">
  import { fade } from 'svelte/transition';
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

  const ethDetails = [
    { label: 'Transaction Hash', value: transaction?.transactionData?.product?.tokenId },
    { label: 'Transferred to address', value: transaction?.transactionData?.mintToAddress },
  ];

  let copied = false;
  let copyNode: string;

  function onCopy({ trx, str, node }: { trx: Transaction; str: string; node: string }) {
    if (trx) {
      copy(trx._id);
    } else {
      copy(str);
    }
    copyNode = node;
    copied = true;
    setTimeout(() => ((copied = false), (copyNode = undefined)), 1500);
  }

  const ethPurchase = () => {
    const { status, transactionData, type } = transaction;
    return type === 'purchase' && status === 'success' && transactionData?.cost?.currency === 'ETH';
  };

  const usdcWithdrawal = () => {
    const { transactionData, type } = transaction;
    return type === 'withdrawal' && transactionData?.withdraw?.usdcAddress;
  };
</script>

<div class="py-4 border-t border-b border-gray-500">
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-2">
      <div class="label">Transaction ID</div>
      <div>{transaction._id}</div>
    </div>
    <div class="flex flex-col md:flex-row justify-center gap-2 items-center">
      {#if copyNode === 'trxId' && copied}
        <div in:fade>Copied</div>
      {:else}
        <button
          type="button"
          class="p-2.5 rounded-full transition duration-500 ease-in-out"
          in:fade
          on:click={() => onCopy({ trx: transaction, str: undefined, node: 'trxId' })}
        >
          <Icon path={mdiContentCopy} flip="h" />
        </button>
      {/if}
    </div>
  </div>
</div>

<div class="flex flex-col gap-4 mt-4">
  {#if ethPurchase()}
    {#each ethDetails as ethDetail}
      {#if ethDetail?.value}
        <div class="flex items-center">
          <div class="label mr-2">{ethDetail.label}</div>
          <div class="truncate ml-auto">{ethDetail.value}</div>
          {#if copyNode === ethDetail.label && copied}
            <div in:fade>Copied</div>
          {:else}
            <button
              type="button"
              class="ml-1 p-1 rounded-full justify-self-end"
              in:fade
              on:click={() => onCopy({ trx: undefined, str: ethDetail?.value, node: ethDetail.label })}
            >
              <Icon path={mdiContentCopy} size="1em" flip="h" />
            </button>
          {/if}
        </div>
      {/if}
    {/each}
  {/if}
  {#if usdcWithdrawal()}
    <div class="flex items-center justify-between">
      <div class="label">Withdrawal wallet address</div>
      <div class="truncate">{transaction?.transactionData?.withdraw?.usdcAddress}</div>
    </div>
  {/if}
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
    background: var(--transaction-details-copy-bg, theme('colors.gray.100'));
  }
</style>
