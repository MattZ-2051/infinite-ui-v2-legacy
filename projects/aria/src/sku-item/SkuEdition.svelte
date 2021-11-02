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
        return 'One-of-a-Kind: a truly unique collectible.';
      case 'limited':
        return 'Limited Edition: a finite number available';
      case 'released':
        return 'Open Edition: any number can be minted before the end date.';
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
    color: var(--edition-single-color);
  }
  .unique-badge {
    background: var(--edition-single-color);
  }
  .limited-text {
    color: var(--edition-limited-color);
  }
  .limited-badge {
    background: var(--edition-limited-color);
  }
  .released-text {
    color: var(--edition-open-color);
  }
  .released-badge {
    background: var(--edition-open-color);
  }
</style>
