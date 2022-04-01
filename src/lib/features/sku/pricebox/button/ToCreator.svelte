<script lang="ts">
  import type { ActionType } from '$lib/features/product/actions/types';

  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  export let onSell: (actionType: ActionType) => void;
</script>

<SkuPriceBoxButton action on:click={() => onSell('create-sale')}
  ><div class="text-2xl">Sell Item</div></SkuPriceBoxButton
>
<div class="from-collectors-line z-∞" />
<div style="border-top:var(--sku-price-box-border-top, 1px solid black);">
  <SkuPriceBoxButton action on:click={() => onSell('auction')}
    ><div class="text-2xl">Start Auction</div></SkuPriceBoxButton
  >
</div>
