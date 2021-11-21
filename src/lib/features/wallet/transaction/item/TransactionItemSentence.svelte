<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { CLIENT_API_HEADER } from '$project/variables';
  import UserLink from '$lib/components/UserLink.svelte';
  import routes from '$project/routes';
  import { formatCurrency } from '$util/format';

  export let transaction: Transaction;

  $: sku = transaction.transactionData?.sku;
  $: name = sku?.name || '';
  $: serialNumber = transaction.transactionData?.product?.serialNumber || '';
  $: sellerUsername = transaction.transactionData.seller?.username || '';
  $: buyerUsername = transaction.transactionData.buyer?.username || '';
  $: type = transaction.type;
  $: status = transaction.status;
  $: deposit = transaction.transactionData.deposit;

  $: isEth = deposit?.balanceCurrency === 'ETH';
</script>

<span class="text-left cursor-default text-default" on:click={(event) => event.stopPropagation()}>
  {#if type === 'royalty_fee'}
    {status === 'error' ? 'You tried to receive' : 'You received'} a royalty payment for the sale of
    {#if sku?.tenant !== CLIENT_API_HEADER}
      <span class="rounded bg-gray-100 text-gray-700 inline capitalize text-xs px-2">{sku?.tenant}</span>
      <span>{name} #{serialNumber}</span>
    {:else}
      <a class="link" href={routes.sku(sku?._id)}>{name} </a>
      <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
    {/if}
  {:else if type === 'purchase'}
    {#if sku?.tenant !== CLIENT_API_HEADER}
      <span class="rounded bg-gray-100 text-gray-700 inline capitalize text-xs px-2">{sku?.tenant}</span>
      <span>{name} #{serialNumber}</span>
      <span class="text-gray-400">from</span>
      <span>@{sellerUsername}</span>
    {:else}
      <a class="link" href={routes.sku(sku?._id)}>{name} </a>
      <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
      <UserLink username={sellerUsername}>
        <span class="text-gray-400" slot="prefix">from</span>
      </UserLink>
    {/if}
  {:else if type === 'sale'}
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
  {:else if type === 'withdrawal'}
    {#if transaction.transactionData.withdraw.type === 'usdc'}
      USDC to wallet address
    {:else if transaction.transactionData.withdraw.type === 'eth'}
      ETH to wallet address
    {:else}
      funds to bank {transaction.transactionData.withdraw.institution_name} and account ending in
      <span>{transaction.transactionData.withdraw.ach_number}</span>
    {/if}
  {:else if type === 'deposit'}
    {#if isEth}
      <span> {formatCurrency(deposit.amount, { currency: deposit?.balanceCurrency })} </span>
      added to your balance
    {:else if deposit.type === 'cc'}
      {status === 'error' ? 'You tried to add' : 'You added'}
      funds from your
      <span>{transaction.transactionData.deposit.card?.network}</span>
      credit card ending in
      <span>{transaction.transactionData.deposit.card?.last4} </span>
    {:else if deposit.type === 'circle' || deposit.type === 'hbar'}
      You added
      <span> {formatCurrency(+deposit.amount, { currency: deposit?.balanceCurrency })} </span>
      by depositing
      <span> {+deposit.amountUnrated} </span>
      <span>
        {(deposit?.circleType ?? deposit.type).toUpperCase()}
      </span>
    {:else if !isEth}
      funds by depositing
      <span> {formatCurrency(+deposit.amount, { currency: deposit?.balanceCurrency })} </span>
      using Coinbase
    {/if}
  {:else if type === 'nft_redeem'}
    {#if sku?.tenant !== CLIENT_API_HEADER}
      <span class="rounded bg-gray-100 text-gray-700 inline capitalize text-xs px-2">{sku?.tenant}</span>
      {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
      <span>{name} #{serialNumber}</span>
    {:else}
      {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
      {sku?.name ? sku.name : ''}
      <span class="font-semibold underline hover:no-underline text-black"
        ><a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
      >
    {/if}
  {/if}
  {#if status === 'pending'}
    <span> (Pending)</span>
  {:else if status === 'error'}
    <span class="text-red-600"> (Transaction failed)</span>
  {/if}
</span>
