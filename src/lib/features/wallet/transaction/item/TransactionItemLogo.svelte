<script lang="ts">
  import type { Transaction } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import hedera from '$lib/components/icons/hedera';
  import { selectLogo } from './transaction-item.service';

  export let transaction: Transaction;
  $: type = transaction.type;
  $: deposit = transaction.transactionData.deposit;
  $: [src, alt] = selectLogo(transaction);
  $: splitted = src.split('.');
  $: isVideo = ['mp4', 'mov', 'flv', 'm4a', '3gp', 'mkv'].includes(splitted[splitted.length - 1]);
</script>

{#if src !== '' && alt !== ''}
  {#if !isVideo}
    <img class="h-14 w-14 rounded-full object-cover" {src} {alt} />
  {:else}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class="h-14 w-14 rounded-full object-cover">
      <source src={src + '#t=0.1'} type="video/mp4" />
    </video>
  {/if}
{:else if type === 'deposit'}
  {#if deposit?.type === 'hbar'}
    <div class="h-14 w-14 border border-gray-500 rounded-xl flex justify-center items-center">
      <Icon path={hedera} size="0.6" />
    </div>
  {/if}{:else if type === 'nft_redeem'}
  <IconRedeem size={48} />
{/if}
