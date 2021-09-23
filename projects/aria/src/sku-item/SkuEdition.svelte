<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import type { SupplyInfo } from '$lib/features/sku/sku.service';
  import tooltip from '$ui/tooltip';
  import {
    createSkuMessageType,
    createProductMessageType,
    createSkuMessage,
    createProductMessage,
  } from '$lib/features/sku/sku.service';

  export let sku: Sku;
  export let product: Product = undefined;

  let supply: SupplyInfo;
  $: supply = product ? createProductMessageType(product) : createSkuMessageType(sku);

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

{#if supply}
  <div class="flex items-center whitespace-nowrap" use:tooltip={createTooltipMessage(supply.type)}>
    {#if product}
      <div class="{supply.type}-badge w-4 h-4 rounded-full mr-2" />
      <span class="{supply.type}-text">{createProductMessage(supply.type, supply.quantity, product)}</span>
    {:else}
      <div class="{supply.type}-badge w-4 h-4 rounded-full mr-2" />
      <span class="{supply.type}-text">{createSkuMessage(supply.type, supply.quantity, sku)}</span>
    {/if}
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
