<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { getSupplyInfo } from '$lib/features/sku/sku.service';

  export let item: Sku;

  $: supply = getSupplyInfo(item);
</script>

{#if supply}
  <section class="flex items-center whitespace-nowrap">
    <span>{supply.label}</span>
  </section>
{/if}

<style lang="postcss"></style>
