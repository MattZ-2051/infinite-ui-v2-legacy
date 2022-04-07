<script lang="ts">
  import type { Listing } from '$lib/sku-item/types';
  import type { ActionType } from '$lib/features/product/actions/types';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  export let onSell: (actionType: ActionType) => void;
  export let onCancel: (actionType: ActionType) => void;
  export let state: 'noSale' | 'upcoming' | 'active';
  export let activeListings: Listing[] = [];
  export let upcomingSkuListings: Listing[] = [];

  $: saleType = [...activeListings, ...upcomingSkuListings][0]?.saleType;
</script>

<div class="from-collectors-line z-∞" />
<div style="border-top:var(--sku-price-box-border-top, 1px solid black);">
  {#if state === 'noSale'}
    <SkuPriceBoxButton action on:click={() => onSell('create-sale')}
      ><div class="text-2xl">Sell Item</div></SkuPriceBoxButton
    >
    <div class="from-collectors-line z-∞" />
    <div style="border-top:var(--sku-price-box-border-top, 1px solid black);">
      <SkuPriceBoxButton action on:click={() => onSell('auction')}
        ><div class="text-2xl">Start Auction</div></SkuPriceBoxButton
      >
    </div>
  {:else if state === 'upcoming' || state === 'active'}
    {#if saleType === 'auction'}
      <SkuPriceBoxButton action on:click={() => onCancel('cancel-auction')}>
        <div class="text-2xl">Cancel Auction</div>
      </SkuPriceBoxButton>
    {:else if saleType === 'fixed'}
      <SkuPriceBoxButton action on:click={() => onCancel('cancel-sale')}>
        <div class="text-2xl">Cancel Sale</div>
      </SkuPriceBoxButton>
    {/if}
  {/if}
</div>
