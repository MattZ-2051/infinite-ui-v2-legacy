<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import RoyaltyFeeSentence from './item-sentence/RoyaltyFeeSentence.svelte';
  import PurchaseSentence from './item-sentence/PurchaseSentence.svelte';
  import SaleSentence from './item-sentence/SaleSentence.svelte';
  import WithdrawalSentence from './item-sentence/WithdrawalSentence.svelte';
  import DepositSentence from './item-sentence/DepositSentence.svelte';
  import NFTRedeem from './item-sentence/NFTRedeem.svelte';

  export let transaction: Transaction;

  $: type = transaction.type;
  $: status = transaction.status;
</script>

<span class="text-left cursor-default text-default" on:click={(event) => event.stopPropagation()}>
  {#if type === 'royalty_fee'}
    <RoyaltyFeeSentence {transaction} />
  {:else if type === 'purchase'}
    <PurchaseSentence {transaction} />
  {:else if type === 'sale'}
    <SaleSentence {transaction} />
  {:else if type === 'withdrawal'}
    <WithdrawalSentence {transaction} />
  {:else if type === 'deposit'}
    <DepositSentence {transaction} />
  {:else if type === 'nft_redeem'}
    <NFTRedeem {transaction} />
  {/if}
  {#if status === 'pending'}
    <span> (Pending)</span>
  {:else if status === 'error'}
    <span class="text-red-600"> (Transaction failed)</span>
  {/if}
</span>
