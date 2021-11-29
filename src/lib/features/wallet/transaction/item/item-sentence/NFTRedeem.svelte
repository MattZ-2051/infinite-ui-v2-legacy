<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { CLIENT_API_HEADER } from '$project/variables';
  import routes from '$project/routes';

  export let transaction: Transaction;

  $: sku = transaction.transactionData?.sku;
  $: name = sku?.name || '';
  $: serialNumber = transaction.transactionData?.product?.serialNumber || '';
  $: status = transaction.status;
</script>

{#if sku?.tenant !== CLIENT_API_HEADER}
  <span class="rounded bg-gray-100 text-gray-700 inline capitalize text-xs px-2">{sku?.tenant}</span>
  {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
  <span>{name} #{serialNumber}</span>
{:else}
  {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
  {sku?.name ? sku.name : ''}
  <span class="font-semibold underline hover:no-underline text-black">
    <a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
  </span>
{/if}
