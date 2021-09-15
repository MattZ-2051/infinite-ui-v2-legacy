<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
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
</script>

<span class="text-left cursor-default" on:click={(event) => event.stopPropagation()}>
  {#if type === 'royalty_fee'}
    {status === 'error' ? 'You tried to receive' : 'You received'} a royalty payment for the sale of
    <a class="link" href={routes.sku(sku?._id)}>{name} </a>
    <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
  {:else if type === 'purchase'}
    <a class="link" href={routes.sku(sku?._id)}>{name} </a>
    <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
    <UserLink username={sellerUsername}>
      <span class="text-gray-400" slot="prefix">from</span>
    </UserLink>
  {:else if type === 'sale'}
    <a class="link" href={routes.sku(sku?._id)}>{name} </a>
    <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
    <UserLink username={buyerUsername} hasLinkClass={true}>
      <span class="text-gray-400" slot="prefix">to</span>
    </UserLink>
  {:else if type === 'withdrawal'}
    {#if transaction.transactionData.withdraw.type === 'usdc'}
      USDC to wallet
      <span>{transaction.transactionData.withdraw.usdcAddress}</span>
    {:else}
      funds to bank {transaction.transactionData.withdraw.institution_name} and acount ending in
      <span>{transaction.transactionData.withdraw.ach_number}</span>
    {/if}
  {:else if type === 'deposit'}
    {status === 'error' ? 'You tried to add funds' : 'You added funds'}
    {#if deposit.type === 'cc'}
      from your
      <span>{transaction.transactionData.deposit.card?.network}</span>
      credit card ending in
      <span>{transaction.transactionData.deposit.card?.last4} </span>
    {:else if deposit.type === 'circle'}
      by depositing
      <span>
        {#if deposit.circleType === 'btc'}
          BTC
        {:else if deposit.circleType === 'eth'}
          ETH
        {:else}
          USDC
        {/if}
      </span>
    {:else if deposit.type === 'hbar' || deposit.type === 'coinbase'}
      by depositing
      <span> {formatCurrency(+deposit.amount)} </span>
      using
      <span>
        {deposit.type === 'coinbase' ? 'Coinbase' : 'Hbar'}
      </span>
    {/if}
  {:else if type === 'nft_redeem'}
    {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
    {sku?.name ? sku.name : ''}
    <span class="font-semibold underline hover:no-underline text-black"
      ><a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
    >
  {/if}
  {#if status === 'pending'}
    <span> (Pending)</span>
  {:else if status === 'error'}
    <span class="text-red-600"> (Transaction failed)</span>
  {/if}
</span>
