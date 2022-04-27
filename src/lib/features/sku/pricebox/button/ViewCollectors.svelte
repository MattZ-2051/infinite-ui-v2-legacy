<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku } from '$lib/sku-item/types';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let sku: Sku;

  const parameters =
    sku.mintPolicy.transaction === 'later' ? '?mintStatus=all&sortBy=serialNumber:desc' : '?saleType=all';
  const href = routes.collectors(sku._id, parameters);
</script>

<SkuPriceBoxButton action={href !== undefined} polling={$isPolling} on:click={() => goto(href)}>
  <div class="flex justify-between gap-2">
    <div class="text-2xl from-collector-text-custom">View Collectors</div>
  </div>
</SkuPriceBoxButton>

<style lang="postcss">
  .from-collector-text-custom {
    font-weight: var(--font-weight-view-collector, 400);
  }
</style>
