<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { mdiChevronDown } from '@mdi/js';
  import { formatDate, formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import hedera from '$lib/components/icons/hedera';

  export let transaction: Transaction;

  let isOpen = false;

  $: sku = transaction.transactionData?.sku;
  $: name = sku?.name || '';
  $: serialNumber = transaction.transactionData.product[0]?.serialNumber || '';
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
      <img src="/sold-normal.png" alt="sold" />
    {/if}

    {#if type === 'purchase'}
      <img src="/bought-normal.png" alt="bought" />
    {/if}

    {#if type === 'withdrawal'}
      <img src="/withdrew-funds.png" alt="withdrew" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'cc'}
      <img src="/added-funds.png" alt="added" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'circle'}
      <img style="width:32px; height:32px" src="/usdcoin.png" alt="usdcoin" />
    {/if}

    {#if type === 'deposit' && deposit.type === 'coinbase'}
      <img src="/added-funds-coinbase.png" alt="coinbase" />
    {/if}
    {#if type === 'deposit' && deposit.type === 'hbar'}
      <div
        style="width:32px; height:32px; border:1px solid #EBEBEB;"
        class="rounded-xl  flex justify-center items-center"
      >
        <Icon path={hedera} size="0.6" />
      </div>
    {/if}
  </div>
  <div class="flex-grow">
    <div class="flex div-style items-center">
      <div class="container-message grid grid-cols-2  gap-x-10 gap-y-2  w-full items-center">
        <span class="">
          {#if type === 'royalty_fee'}
            <span class="message">You received a royalty payment for the sale of </span>
            <span class="font-semibold underline hover:no-underline"><a href="/marketplace/{sku?._id}">{name} </a></span
            >
            <span class="font-semibold underline hover:no-underline"
              ><a href="/product/{transaction.transactionData.product[0]?._id}">#{serialNumber}</a></span
            >
          {/if}

          {#if type === 'purchase' && status === 'success'}
            <span class="message">You bought</span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/marketplace/{sku?._id}">{name} </a>
            </span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/product/{transaction.transactionData.product[0]?._id}">#{serialNumber}</a></span
            >
            <UserLink
              username={transaction.transactionData.seller?.username}
              class="font-semibold underline hover:no-underline"
            >
              <span class="message" slot="prefix">from</span>
            </UserLink>
          {/if}

          {#if type === 'purchase' && status === 'error'}
            <span class="message">You tried buying</span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/marketplace/{sku?._id}">{name} </a>
            </span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/product/{transaction.transactionData.product[0]?._id}">#{serialNumber}</a></span
            >
            <UserLink username={sellerUsername} class="font-semibold underline hover:no-underline" hasLinkClass={false}>
              <span class="message" slot="prefix">from</span>
            </UserLink>
            <span class="font-semibold text-red-600">(Transaction failed)</span>
          {/if}

          {#if type === 'sale' && status === 'success'}
            <span class="message">You sold</span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/marketplace/{sku?._id}">{name} </a>
            </span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/product/{transaction.transactionData.product[0]?._id}">#{serialNumber}</a></span
            >
            <UserLink username={buyerUsername} class="font-semibold underline hover:no-underline" hasLinkClass={false}>
              <span class="message" slot="prefix">to</span>
            </UserLink>
          {/if}

          {#if type === 'withdrawal' && status === 'success'}
            <span class="message"
              >You withdrew funds to bank {transaction.transactionData.withdraw.institution_name} and acount ending in</span
            >
            <span class="font-semibold">{transaction.transactionData.withdraw.ach_number}</span>
          {/if}

          {#if type === 'sale' && status === 'error'}
            <span class="message">You tried selling</span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/marketplace/{sku?._id}">{name} </a>
            </span>
            <span class="font-semibold underline hover:no-underline"
              ><a href="/product/{transaction.transactionData.product[0]?._id}">#{serialNumber}</a></span
            >
            <UserLink username={buyerUsername} class="font-semibold underline hover:no-underline" hasLinkClass={false}>
              <span class="message" slot="prefix">to</span>
            </UserLink>
            <span class="font-semibold text-red-600">(Transaction failed)</span>
          {/if}

          {#if type === 'deposit' && deposit.type === 'cc'}
            <span class="message"
              >You added funds from your <span class="font-semibold text-black"
                >{transaction.transactionData.deposit.card.network}</span
              >
              credit card ending in
              <span class="font-semibold text-black">{transaction.transactionData.deposit.card.last4} </span></span
            >
          {/if}

          {#if type === 'deposit' && deposit.type === 'circle'}
            <span class="message">You added funds by depositing </span>
            <span class="font-medium">USDC</span>
          {/if}

          {#if type === 'deposit' && (deposit.type === 'hbar' || deposit.type === 'coinbase')}
            <span class="message">You added funds by depositing </span>
            <span class="font-medium"> {formatCurrency(+deposit.amount)} </span>
            <span class="message ">using </span>
            <span class="font-medium">
              {#if deposit.type === 'coinbase'}
                Coinbase
              {:else if deposit.type === 'hbar'}
                Hbar
              {/if}
              {status === 'pending' ? '(Pending)' : ''}
            </span>
          {/if}
        </span>
        <div class="flex justify-between gap-x-3">
          <span class="message-color font-extrabold italic">{formatDate(transaction.createdAt, 'MMMM Do, YYYY ')}</span>
          <span
            class="whitespace-nowrap flex items-center "
            class:text-black={(type === 'purchase' || type === 'sale') && status === 'error'}
            class:withdraw-color={(type === 'purchase' || type === 'withdrawal') && status === 'success'}
            class:deposit-color={(type === 'royalty_fee' || type === 'sale' || type === 'deposit') &&
              status === 'success'}
          >
            {#if (type === 'royalty_fee' || type === 'sale' || type === 'deposit') && status === 'success'}
              +
            {/if}
            {#if (type === 'purchase' || type === 'withdrawal') && status === 'success'}
              -
            {/if}
            {#if type === 'royalty_fee'}
              {formatCurrency(cost.royaltyFee)}
            {/if}
            {#if type === 'sale' && status === 'success'}
              {formatCurrency(+cost.finalPayout)}
            {/if}
            {#if type === 'sale' && status === 'error'}
              <span class="line-through">{formatCurrency(+cost.finalPayout)}</span>
            {/if}
            {#if type === 'deposit'}
              {formatCurrency(+deposit.amount)}
            {/if}
            {#if type === 'purchase' && status === 'success'}
              {formatCurrency(cost.totalCost)}
            {/if}
            {#if type === 'withdrawal' && status === 'success'}
              {formatCurrency(transaction.transactionData.withdraw.amount)}
            {/if}
            {#if type === 'purchase' && status === 'error'}
              <span class="line-through">{formatCurrency(cost.totalCost)}</span>
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
