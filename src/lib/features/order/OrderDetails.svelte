<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { formatCurrency } from '$util/format';
  import ProductModalInfo from '../product/ProductModalInfo.svelte';
  import OrderProductPricing from './OrderProductPricing.svelte';

  export let sku: Sku;
  export let product: Product = undefined;
  export let listingPrice: number;
  export let marketplaceFee: number;
  export let hideWalletBalance = false;
  export let userBalance: string = undefined;
  export let insufficientFunds = false;
</script>

<ProductModalInfo {sku} {product} />
<div>
  <OrderProductPricing price={listingPrice} {marketplaceFee} currency={sku.currency} />
  {#if !hideWalletBalance}
    <div class={`flex items-center justify-between pt-2 ${insufficientFunds ? 'text-red-500' : 'text-green-500'}`}>
      <span> Your current balance: </span>
      <span class="flex text-lg">
        {formatCurrency(userBalance, { currency: sku.currency })}
      </span>
    </div>
  {/if}
</div>
