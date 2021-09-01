<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { createMessageType } from '$lib/features/sku/sku.service';

  export let item: Sku;

  $: supply = createMessageType(item);

  const createMessage = (messageType: string, quantity: number): string | undefined => {
    switch (messageType) {
      case 'limited':
        return `Limited to ${quantity} Editions`;
      case 'released':
        return item.minStartDate > new Date() ? `${quantity} to be Released` : `${quantity} Released`;
      case 'unique':
        return '1 of 1 Limited Edition';
      default:
        return undefined;
    }
  };
</script>

{#if supply}
  <div class="flex items-center whitespace-nowrap">
    <span>{createMessage(supply.type, supply.quantity)}</span>
  </div>
{/if}
