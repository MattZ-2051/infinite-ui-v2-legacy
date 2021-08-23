<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { mdiChevronDown } from '@mdi/js';
  import { formatDate, formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import hedera from '$lib/components/icons/hedera';
  import routes from '$lib/routes';
  import soldNormal from './assets/sold-normal.png';
  import boughtNormal from './assets/bought-normal.png';
  import withdrawalFunds from './assets/withdrew-funds.png';
  import addedFunds from './assets/added-funds.png';
  import usdcoin from './assets/usdcoin.png';
  import addedFundsCoinbase from './assets/added-funds-coinbase.png';

  export let transaction: Transaction;

  let isOpen = false;

  $: sku = transaction.transactionData?.sku;
  $: name = sku?.name || '';
  $: serialNumber = transaction.transactionData?.product?.serialNumber || '';
  $: sellerUsername = transaction.transactionData.seller?.username || '';
  $: buyerUsername = transaction.transactionData.buyer?.username || '';
  $: type = transaction.type;
  $: status = transaction.status;
  $: deposit = transaction.transactionData.deposit;
  $: cost = transaction.transactionData.cost;
</script>

<div class="grid grid-cols-3 items-center gap-x-4 container-tr py-4 border-b border-gray-200">
  <div>
    {#if type === 'royalty_fee' || type === 'sale'}
      <img src={soldNormal} alt="sold" />
    {/if}

    {#if type === 'purchase'}
      <img src={boughtNormal} alt="bought" />
    {/if}

    {#if type === 'withdrawal'}
      <img src={withdrawalFunds} alt="withdrew" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'cc'}
      <img src={addedFunds} alt="added" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'circle'}
      <img style="width:32px; height:32px" src={usdcoin} alt="usdcoin" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'coinbase'}
      <img src={addedFundsCoinbase} alt="coinbase" />
    {/if}
    {#if type === 'deposit' && deposit.type === 'hbar'}
      <div
        style="width:32px; height:32px; border:1px solid #EBEBEB;"
        class="rounded-xl  flex justify-center items-center"
      >
        <Icon path={hedera} size="0.6" />
      </div>
    {/if}
    {#if type === 'nft_redeem'}
      <div
        style="width:32px; height:32px; border:1px solid #EBEBEB;"
        class="rounded-xl  flex justify-center items-center"
      >
        <IconRedeem size="0.8" />
      </div>
    {/if}
  </div>
  <div class="flex-grow">
    <div class="flex div-style items-center">
      <div class="container-message grid grid-cols-2  gap-x-10 gap-y-2  w-full items-center">
        <span class="message">
          {#if type === 'royalty_fee'}
            {status === 'error' ? 'You tried to receive' : 'You received'} a royalty payment for the sale of
            <span class="font-semibold underline hover:no-underline text-black"
              ><a href={routes.sku(sku?._id)}>{name} </a></span
            >
            <span class="font-semibold underline hover:no-underline text-black">
              <a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
            >
          {/if}

          {#if type === 'purchase'}
            {status === 'error' ? 'You tried to buy' : 'You bought'}
            <span class="font-semibold underline hover:no-underline text-black"
              ><a href={routes.sku(sku?._id)}>{name} </a></span
            >
            <span class="font-semibold underline hover:no-underline text-black">
              <a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
            >
            <UserLink username={sellerUsername} class="font-semibold underline hover:no-underline text-black">
              <span class="message" slot="prefix">from</span>
            </UserLink>
          {/if}

          {#if type === 'sale'}
            {status === 'error' ? 'You tried to sell' : 'You sold'}
            <span class="font-semibold underline hover:no-underline text-black"
              ><a href={routes.sku(sku?._id)}>{name} </a></span
            >
            <span class="font-semibold underline hover:no-underline text-black">
              <a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
            >
            <UserLink
              username={buyerUsername}
              class="font-semibold underline hover:no-underline text-black"
              hasLinkClass={false}
            >
              <span class="message" slot="prefix">to</span>
            </UserLink>
          {/if}

          {#if type === 'withdrawal'}
            {status === 'error' ? 'You tried to withdraw' : 'You withdrew'}
            {#if transaction.transactionData.withdraw.type === 'usdc'}
              USDC to wallet
              <span class="font-semibold text-black">{transaction.transactionData.withdraw.usdcAddress}</span>
            {:else}
              funds to bank {transaction.transactionData.withdraw.institution_name} and acount ending in
              <span class="font-semibold text-black">{transaction.transactionData.withdraw.ach_number}</span>
            {/if}
          {/if}

          {#if type === 'deposit'}
            {status === 'error' ? 'You tried to add funds' : 'You added funds'}
            {#if deposit.type === 'cc'}
              from your
              <span class="font-semibold text-black">{transaction.transactionData.deposit.card?.network}</span>
              credit card ending in
              <span class="font-semibold text-black">{transaction.transactionData.deposit.card?.last4} </span>
            {:else if deposit.type === 'circle'}
              by depositing
              <span class="text-black font-medium">USDC</span>
            {:else if deposit.type === 'hbar' || deposit.type === 'coinbase'}
              by depositing
              <span class="text-black font-medium"> {formatCurrency(+deposit.amount)} </span>
              using
              <span class="text-black font-medium">
                {deposit.type === 'coinbase' ? 'Coinbase' : 'Hbar'}
              </span>
            {/if}
          {/if}

          {#if type === 'nft_redeem'}
            {status === 'error' ? 'You tried to redeem' : 'You redeemed'}
            {sku?.name ? sku.name : ''}
            <span class="font-semibold underline hover:no-underline text-black"
              ><a href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a></span
            >
          {/if}

          {#if status === 'pending'}
            <span class="font-semibold text-black"> (Pending)</span>
          {:else if status === 'error'}
            <span class="font-semibold text-red-600"> (Transaction failed)</span>
          {/if}
        </span>
        <div class="flex justify-between gap-x-3">
          <span class="message-color font-extrabold italic">{formatDate(transaction.createdAt, 'MMMM Do, YYYY ')}</span>
          <span
            class="whitespace-nowrap flex items-center "
            class:withdraw-color={(type === 'purchase' || type === 'withdrawal') && status === 'success'}
            class:deposit-color={(type === 'royalty_fee' || type === 'sale' || type === 'deposit') &&
              status === 'success'}
            class:line-through={status === 'error'}
          >
            {#if (type === 'royalty_fee' || type === 'sale' || type === 'deposit') && status === 'success'}
              +
            {/if}
            {#if (type === 'purchase' || type === 'withdrawal') && status === 'success'}
              -
            {/if}
            {#if type === 'royalty_fee'}
              {formatCurrency(cost?.royaltyFee)}
            {/if}
            {#if type === 'sale'}
              {formatCurrency(+cost?.finalPayout)}
            {/if}
            {#if type === 'deposit'}
              {formatCurrency(+deposit?.amount)}
            {/if}
            {#if type === 'purchase'}
              {formatCurrency(cost?.totalCost)}
            {/if}
            {#if type === 'withdrawal'}
              {formatCurrency(transaction.transactionData.withdraw?.amount)}
            {/if}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cursor-pointer"
    on:click={() => {
      isOpen = !isOpen;
    }}
  >
    <Icon flip={isOpen ? 'v' : false} path={mdiChevronDown} />
  </div>
  {#if isOpen}
    <div />
    <div class="py-2"><span class="message">Transaction ID: </span>{transaction._id}</div>
  {/if}
</div>

<style>
  .message-color {
    color: #9e9e9e;
  }
  .message {
    color: #9e9e9e;
    font-weight: 500;
  }
  .deposit-color {
    color: #00c44f;
  }
  .withdraw-color {
    color: #da1010;
  }
  .container-message {
    grid-template-columns: 2.6fr 1fr;
  }
  .container-tr {
    grid-template-columns: 32px 9999fr 32px;
  }
</style>
