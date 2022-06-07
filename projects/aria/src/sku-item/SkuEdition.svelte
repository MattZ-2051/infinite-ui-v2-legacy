<script lang="ts">
  import type { SupplyInfo } from '$lib/features/sku/sku.service';
  import type { Sku, Product } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { isSkuV2 } from '$lib/infinite-api-sdk/guard.service';
  import tooltip from '$ui/tooltip';
  import {
    createSkuMessageType,
    createProductMessageType,
    createSkuMessage,
    createProductMessage,
    createSkuMessageTypeForV2,
  } from '$lib/features/sku/sku.service';

  export let sku: Sku | SkuV2;
  export let product: Product = undefined;

  let supply: SupplyInfo;
  $: if (product) {
    supply = createProductMessageType(product);
  } else if (isSkuV2(sku)) {
    supply = createSkuMessageTypeForV2(sku);
  } else {
    supply = createSkuMessageType(sku);
  }

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
