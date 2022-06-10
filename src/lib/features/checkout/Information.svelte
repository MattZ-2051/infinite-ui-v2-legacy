<script lang="ts">
  import type { SaleType } from '$lib/sku-item/types';

  import { formatCurrency } from '$util/format';

  export let conversionRate: number = undefined;
  export let listingSaleType: SaleType = undefined;

  const isAuctionSale = listingSaleType === 'auction';
</script>

<p class="text-xs text-default-opacity-50 font-normal pb-4">
  {#if isAuctionSale}
    Placing a bid will freeze the associated funds from your wallet until the auction ends. Bids cannot be canceled but
    can be increased as the auction progresses.
  {/if}
  All resales of this product are subject to a 5% royalty fee set by and to be paid to the original creator.
</p>
{#if conversionRate}
  <p title="conversion-tag" class="text-xs text-gray-500 font-normal pb-4">
    Conversion rate: {formatCurrency(conversionRate)} = ETH 1
  </p>
{/if}
