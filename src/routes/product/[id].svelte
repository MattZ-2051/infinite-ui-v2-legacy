<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import ProductPage from '$lib/features/product/Product.svelte';
  import { product, fetchProductFx, clearProduct } from '$lib/features/product/product.store';

  export async function load({ page: location, fetch }: LoadInput) {
    const { id } = location.params;
    const page = +location.query.get(`page`) || 1;
    const tab = location.query.get(`tab`) as 'auction' | 'history';

    await fetchProductFx({ id, tab, page, fetch });
    return {};
  }
</script>

<script lang="ts">
  import { navigating } from '$app/stores';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  function resetStore(path: string) {
    // Leaving current product page
    if (path && path !== `/product/${$product._id}`) {
      setTimeout(() => clearProduct(), 500);
    }
  }

  $: resetStore($navigating?.to?.path);
</script>

{#if $product}
  <Seo title={`${$product.sku.name} / #${$product.serialNumber}`} image={chooseSkuSocialImage($product.sku)} />
  <ProductPage />
{/if}
