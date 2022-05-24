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
      ><div class="text-2xl from-collector-text-custom scalable-title">Sell Item</div></SkuPriceBoxButton
    >
    <div class="from-collectors-line z-∞" />
    <div style="border-top:var(--sku-price-box-border-top, 1px solid black);">
      <SkuPriceBoxButton action on:click={() => onSell('auction')}
        ><div class="text-2xl from-collector-text-custom scalable-title">Start Auction</div></SkuPriceBoxButton
      >
    </div>
  {:else if state === 'upcoming' || state === 'active'}
    {#if saleType === 'auction'}
      <SkuPriceBoxButton action on:click={() => onCancel('cancel-auction')}>
        <div class="text-2xl from-collector-text-custom scalable-title">Cancel Auction</div>
      </SkuPriceBoxButton>
    {:else if saleType === 'fixed'}
      <SkuPriceBoxButton action on:click={() => onCancel('cancel-sale')}>
        <div class="text-2xl from-collector-text-custom scalable-title">Cancel Sale</div>
      </SkuPriceBoxButton>
    {/if}
  {/if}
</div>

<style lang="postcss">
  .from-collector-text-custom {
    font-weight: var(--font-weight-from-collector, 400);
    font-family: var(--font-family-from-collector, inherit);
  }
  .scalable-title {
    /* 0.055 ratio will scale to 1.5rem when container is 400px */
    --scale-ratio: 0.055;

    font-size: clamp(0.875rem, calc((var(--price-box-container-width) * var(--scale-ratio)) * 1px), 1.5rem);
    @apply transition-all duration-75;
  }
</style>
