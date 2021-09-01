<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { createMessageType } from '$lib/features/sku/sku.service';

  export let item: Sku;

  $: supply = createMessageType(item);

  const createMessage = (messageType: string, quantity: number): string | undefined => {
    switch (messageType) {
      case 'limited':
        return `Limited to ${quantity}`;
      case 'released':
        return item.minStartDate > new Date() ? `${quantity} to be released` : `${quantity} released`;
      case 'unique':
        return '1 of 1';
      default:
        return undefined;
    }
  };
</script>

{#if supply}
  <div class="flex items-center whitespace-nowrap">
    <div class="{supply.type}-badge w-4 h-4 rounded-full mr-2" />
    <span class="{supply.type}-text">{createMessage(supply.type, supply.quantity)}</span>
  </div>
{/if}

<style lang="postcss">
  .unique-text {
    color: var(--edition-unique);
  }
  .unique-badge {
    background: var(--edition-unique);
  }
  .limited-text {
    color: var(--edition-limited);
  }
  .limited-badge {
    background: var(--edition-limited);
  }
  .released-text {
    color: var(--edition-released);
  }
  .released-badge {
    background: var(--edition-released);
  }
</style>
