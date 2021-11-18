<script lang="ts">
  import { formatCurrency, formatEthCurrency } from '$util/format';

  export let price: number;
  export let marketplaceFee: number;
  export let currency: 'USD' | 'ETH';
</script>

<div class="grid grid-cols-2 text-gray-500 font-medium w-full">
  <div class="mb-2">Seller price:</div>
  <div class="text-right">
    {#if currency === 'USD'}
      {formatCurrency(price)}
    {:else if currency === 'ETH'}
      {formatEthCurrency(price, 'symbol')}
    {/if}
  </div>
  <div>Marketplace fee ({marketplaceFee * 100}%):</div>
  <div class="text-right">
    {#if currency === 'USD'}
      {formatCurrency(price + marketplaceFee * price)}
    {:else if currency === 'ETH'}
      {formatEthCurrency(price + marketplaceFee * price, 'symbol')}
    {/if}
  </div>
</div>
<hr class="h-px w-full my-4" />
<div class="grid grid-cols-2 w-full">
  <div class="font-medium">Total:</div>
  <div class="text-right font-semibold">
    {#if currency === 'USD'}
      {formatCurrency(price + marketplaceFee * price)}
    {:else if currency === 'ETH'}
      {formatEthCurrency(price + marketplaceFee * price, 'symbol')}
    {/if}
  </div>
</div>
