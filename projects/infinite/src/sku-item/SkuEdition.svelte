<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import {
    createSkuMessageType,
    createProductMessageType,
    createSkuMessage,
    createProductMessage,
  } from '$lib/features/sku/sku.service';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  $: skuSupply = createSkuMessageType(sku);
  $: productSupply = createProductMessageType(product);
</script>

{#if skuSupply}
  <div class="flex items-center whitespace-nowrap">
    <span>{createSkuMessage(skuSupply.type, skuSupply.quantity, sku)}</span>
  </div>
{/if}

{#if productSupply}
  <div class="flex items-center whitespace-nowrap">
    <span>{createProductMessage(productSupply.type, productSupply.quantity, product)}</span>
  </div>
{/if}
