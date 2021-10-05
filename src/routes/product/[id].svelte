<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import ProductPage from '$lib/features/product/Product.svelte';
  import { product, fetchProductFx, setProduct } from '$lib/features/product/product.store';

  export async function load({ page: location, fetch }: LoadInput) {
    const { id } = location.params;
    const page = +location.query.get(`page`) || 1;
    const tab = location.query.get(`tab`) as 'auction' | 'history';

    return {
      props: { data: await fetchProductFx({ id, tab, page, fetch }) },
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let data: Awaited<ReturnType<typeof fetchProductFx>>;

  $: setProduct(data);
</script>

{#if $product}
  <Seo title={`${$product.sku.name} / #${$product.serialNumber}`} image={chooseSkuSocialImage($product.sku)} />
  <ProductPage />
{/if}
