<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import tooltip from '$ui/tooltip';
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

  const createTooltipMessage = (supplyType: string | undefined) => {
    switch (supplyType) {
      case 'unique':
        return '1 of 1 available';
      case 'limited':
        return 'Pre-determined number of minted collectibles available';
      case 'released':
        return 'Number of minted collectibles determined by quantity purchased before listing end date';
      default:
        return undefined;
    }
  };
</script>

{#if skuSupply}
  <div class="flex items-center whitespace-nowrap" use:tooltip={createTooltipMessage(skuSupply.type)}>
    <div class="{skuSupply.type}-badge w-4 h-4 rounded-full mr-2" />
    <span class="{skuSupply.type}-text">{createSkuMessage(skuSupply.type, skuSupply.quantity, sku)}</span>
  </div>
{/if}
{#if productSupply}
  <div class="flex items-center whitespace-nowrap" use:tooltip={createTooltipMessage(productSupply.type)}>
    <div class="{productSupply.type}-badge w-4 h-4 rounded-full mr-2" />
    <span class="{productSupply.type}-text"
      >{createProductMessage(productSupply.type, productSupply.quantity, product)}</span
    >
  </div>
{/if}

<style lang="postcss">
  .unique-text {
    color: var(--edition-single);
  }
  .unique-badge {
    background: var(--edition-single);
  }
  .limited-text {
    color: var(--edition-limited);
  }
  .limited-badge {
    background: var(--edition-limited);
  }
  .released-text {
    color: var(--edition-open);
  }
  .released-badge {
    background: var(--edition-open);
  }
</style>
