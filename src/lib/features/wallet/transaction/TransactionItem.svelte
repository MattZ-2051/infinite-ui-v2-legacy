<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
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
  import bitcoin from './assets/bitcoin.png';
  import ethcoin from './assets/ethcoin.png';
  import addedFundsCoinbase from './assets/added-funds-coinbase.png';

  export let transaction: Transaction;

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

<div class="flex items-center gap-x-4">
  <div class="hidden lg:block">
    {#if type === 'royalty_fee' || type === 'sale'}
      <img class="h-14 w-14" src={soldNormal} alt="sold" />
    {/if}

    {#if type === 'purchase'}
      <img class="h-14 w-14" src={boughtNormal} alt="bought" />
    {/if}

    {#if type === 'withdrawal'}
      <img src={withdrawalFunds} alt="withdrew" />
    {/if}

    {#if type === 'deposit'}
      {#if deposit.type === 'cc'}
        <img class="h-14 w-14" src={addedFunds} alt="added" />
      {/if}

      {#if deposit.type === 'circle'}
        {#if deposit.circleType === 'eth'}
          <img class="h-14 w-14" src={ethcoin} alt="ethcoin" />
        {:else if deposit.circleType === 'btc'}
          <img class="h-14 w-14" src={bitcoin} alt="bitcoin" />
        {:else}
          <img class="h-14 w-14" src={usdcoin} alt="usdcoin" />
        {/if}
      {/if}

      {#if deposit.type === 'hbar'}
        <div class="h-14 w-14 border border-white-opacity-50 rounded-xl flex justify-center items-center">
          <Icon path={hedera} size="0.6" />
        </div>
      {/if}

      {#if deposit.type === 'coinbase'}
        <img class="h-14 w-14" src={addedFundsCoinbase} alt="coinbase" />
      {/if}
    {/if}

    {#if type === 'nft_redeem'}
      <div class="h-14 w-14 border border-white-opacity-50 rounded-xl flex justify-center items-center">
        <IconRedeem />
      </div>
    {/if}
  </div>

  <div class="flex flex-1 items-center">
    <div class="flex flex-col w-full mr-4">
      <div class="flex justify-between">
        <span class="text-white-opacity-30 text-sm"
          >{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</span
        >
        <span class="whitespace-nowrap flex items-center text-default" class:line-through={status === 'error'}>
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

      <div class="flex justify-between">
        <span class="text-left cursor-default" on:click={(event) => event.stopPropagation()}>
          {#if type === 'royalty_fee'}
            {status === 'error' ? 'You tried to receive' : 'You received'} a royalty payment for the sale of
            <a class="link" href={routes.sku(sku?._id)}>{name} </a>
            <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
          {/if}

          {#if type === 'purchase'}
            <a class="link" href={routes.sku(sku?._id)}>{name} </a>
            <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
            <UserLink username={sellerUsername}>
              <span class="text-white-opacity-40" slot="prefix">from</span>
            </UserLink>
          {/if}

          {#if type === 'sale'}
            <a class="link" href={routes.sku(sku?._id)}>{name} </a>
            <a class="link" href={routes.product(transaction.transactionData.product?._id)}>#{serialNumber}</a>
            <UserLink username={buyerUsername} hasLinkClass={true}>
              <span class="text-white-opacity-40" slot="prefix">to</span>
            </UserLink>
          {/if}

          {#if type === 'withdrawal'}
            {#if transaction.transactionData.withdraw.type === 'usdc'}
              USDC to wallet
              <span>{transaction.transactionData.withdraw.usdcAddress}</span>
            {:else}
              funds to bank {transaction.transactionData.withdraw.institution_name} and acount ending in
              <span>{transaction.transactionData.withdraw.ach_number}</span>
            {/if}
          {/if}

          {#if type === 'deposit'}
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
          {/if}

          {#if type === 'nft_redeem'}
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
        <span class="text-white-opacity-40 text-sm">{formatDate(transaction.createdAt, 'MMMM Do, YYYY ')}</span>
      </div>
    </div>
  </div>
</div>
