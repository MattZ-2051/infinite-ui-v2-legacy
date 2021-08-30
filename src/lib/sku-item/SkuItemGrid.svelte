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
        return 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';

      case 4:
        return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

      default:
        return '';
    }
  }

  export let products: Product[] = [];

  export let skus: Sku[] = [];

  $: productList = max > 0 ? (products || []).slice(0, max) : products || [];
  $: skuList = max > 0 ? skus.slice(0, max) : skus;
</script>

<ThemeContext id="sku-grid">
  <div
    class="grid grid-cols-1 gap-2 max-w-sm mx-auto md:max-w-none md:gap-y-4 md:gap-x-6 {gridResponsiveClass} {$$props.class}"
  >
    {#if productList.length}
      {#each productList as item (item._id)}
        <SkuItem item={item.sku} type="product" />
      {/each}
    {:else}
      {#each skuList as item (item._id)}
        <SkuItem {item} type="sku" />
      {/each}
    {/if}
  </div>
</ThemeContext>
