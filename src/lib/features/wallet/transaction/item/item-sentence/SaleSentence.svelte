<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { CLIENT_API_HEADER } from '$project/variables';
  import UserLink from '$lib/components/UserLink.svelte';
  import routes from '$project/routes';

  export let transaction: Transaction;

  $: sku = transaction.transactionData?.sku;
  $: name = sku?.name || '';
  $: serialNumber = transaction.transactionData?.product?.serialNumber || '';
  $: sellerUsername = transaction.transactionData.seller?.username || '';
  $: buyerUsername = transaction.transactionData.buyer?.username || '';
</script>

{#if sku?.tenant !== CLIENT_API_HEADER}
  <span class="rounded bg-gray-100 text-gray-700 inline capitalize text-xs px-2">{sku?.tenant}</span>
  <span>{name} #{serialNumber}</span>
  <span class="text-gray-400">from</span>
  <span>@{sellerUsername}</span>
{:else}
  <a class="link" href={routes.sku(sku?._id)}>{name} </a>
  <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
  <UserLink username={buyerUsername} hasLinkClass={true}>
    <span class="text-gray-400" slot="prefix">to</span>
  </UserLink>
{/if}
