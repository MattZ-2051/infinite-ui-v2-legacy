<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { getSupplyInfo } from '$lib/features/sku/sku.service';

  export let item: Sku;

  $: supply = getSupplyInfo(item);
</script>

{#if supply}
  <div class="flex items-center whitespace-nowrap">
    <div class="{supply.type}-badge w-4 h-4 rounded-full mr-2" />
    <span class="{supply.type}-text">{supply.label}</span>
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
