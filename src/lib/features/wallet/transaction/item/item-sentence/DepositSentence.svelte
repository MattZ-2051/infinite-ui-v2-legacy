<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import { formatCurrency } from '$util/format';

  export let transaction: Transaction;

  $: status = transaction.status;
  $: deposit = transaction.transactionData.deposit;
  $: isEth = deposit?.balanceCurrency === 'ETH';
</script>

{#if isEth}
  <span> {formatCurrency(deposit.amount, { currency: deposit?.balanceCurrency })} </span>
  added to your balance
{:else if deposit.type === 'cc'}
  {status === 'error' ? 'You tried to add' : 'You added'}
  funds from your
  <span>{transaction.transactionData.deposit.card?.network}</span>
  credit card ending in
  <span>{transaction.transactionData.deposit.card?.last4} </span>
{:else if deposit.type === 'moonpay'}
  You have deposited
  <span> {formatCurrency(+deposit.amount, { currency: deposit?.balanceCurrency })} </span>
  USDC via MoonPay
{:else if deposit.type === 'circle' || deposit.type === 'hbar' || deposit.type === 'moonpay'}
  You added
  <span> {formatCurrency(+deposit.amount, { currency: deposit?.balanceCurrency })} </span>
  by depositing
  <span> {+deposit.amountUnrated} </span>
  <span>
    {(deposit?.circleType ?? deposit.type).toUpperCase()}
  </span>
{:else}
  funds by depositing
  <span> {formatCurrency(+deposit.amount, { currency: deposit?.balanceCurrency })} </span>
  using Coinbase
{/if}
