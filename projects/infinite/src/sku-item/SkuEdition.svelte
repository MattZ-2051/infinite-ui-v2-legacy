<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { getSupplyInfo } from '$lib/features/sku/sku.service';

  export let item: Sku;

  $: supply = getSupplyInfo(item);
</script>

{#if supply}
  <div class="flex items-center whitespace-nowrap">
    <span>{supply.label}</span>
  </div>
{/if}

<style lang="postcss"></style>
