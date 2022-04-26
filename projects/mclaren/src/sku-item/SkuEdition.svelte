<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import type { SupplyInfo } from '$lib/features/sku/sku.service';
  import tooltip from '$ui/tooltip';
  import { createSkuMessageType, createSkuMessage, createProductMessage } from '$lib/features/sku/sku.service';

  export let sku: Sku;
  export let product: Product = undefined;

  let supply: SupplyInfo;
  $: supply = sku && createSkuMessageType(sku);

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
  <div class="block basis-[max-content] whitespace-nowrap truncate" use:tooltip={createTooltipMessage(supply.type)}>
    {#if product}
      <span>{createProductMessage(supply.type, supply.quantity, product)}</span>
    {:else}
      <span>{createSkuMessage(supply.type, supply.quantity, sku)}</span>
    {/if}
  </div>
{/if}
