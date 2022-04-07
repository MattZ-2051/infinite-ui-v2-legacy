<script lang="ts">
  import type { Sku, Product } from './types';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import SkuItem from '$project/sku-item/SkuItem.svelte';

  export let max = 0;
  export let maxCols = 4;

  $: gridResponsiveClass = getGridResponsiveClasses(maxCols);

  function getGridResponsiveClasses(cols: number): string {
    switch (cols) {
      case 3:
        return 'grid-max-cols-3';

      default:
        return 'grid-max-cols-4';
    }
  }

  export let products: Product[] = [];

  export let skus: Sku[] = [];

  $: productList = max > 0 ? (products || []).slice(0, max) : products || [];
  $: skuList = max > 0 ? skus.slice(0, max) : skus;
</script>

<ThemeContext id="sku-grid">
  <div class="sku-grid grid grid-cols-1 max-w-sm mx-auto {gridResponsiveClass} {$$props.class || ''}">
    {#if productList.length}
      {#each productList as item (item._id)}
        <SkuItem product={item} />
      {/each}
    {:else}
      {#each skuList as item (item._id)}
        <SkuItem sku={item} />
      {/each}
    {/if}
  </div>
</ThemeContext>

<style lang="postcss">
  .sku-grid {
    row-gap: var(--sku-item-grid-row-gap, 1.5rem);
    column-gap: var(--sku-item-grid-column-gap, 1.5rem);
  }

  @screen md {
    .grid-max-cols-4 {
      @apply grid-cols-2 max-w-none;
    }
  }

  @screen lg {
    .grid-max-cols-4 {
      @apply grid-cols-3;
    }
  }

  @screen xl {
    .grid-max-cols-4 {
      @apply grid-cols-4;
    }
  }

  @media (min-width: 950px) {
    .grid-max-cols-3 {
      @apply grid-cols-2 max-w-none;
    }
  }

  @media (min-width: 1480px) {
    .grid-max-cols-3 {
      @apply grid-cols-3;
    }
  }
</style>
