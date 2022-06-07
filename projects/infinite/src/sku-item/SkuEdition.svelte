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
  <div class="inline-flex items-center whitespace-nowrap truncate" use:tooltip={createTooltipMessage(supply.type)}>
    {#if product}
      <span>{createProductMessage(supply.type, supply.quantity, product)}</span>
    {:else}
      <span>{createSkuMessage(supply.type, supply.quantity, sku)}</span>
    {/if}
  </div>
{/if}
