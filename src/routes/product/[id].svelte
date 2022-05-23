<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import ProductPage from '$lib/features/product/Product.svelte';
  import { product, fetchProductFx, setProduct } from '$lib/features/product/product.store';

  export const load: Load = async ({ url, params, fetch }) => {
    const { id } = params;
    const page = +url.searchParams.get(`page`) || 1;
    const tab = url.searchParams.get(`tab`) as 'auction' | 'history' | 'owner';

    return {
      props: { data: await fetchProductFx({ id, tab, page, fetch }) },
    };
  };
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let data: Awaited<ReturnType<typeof fetchProductFx>>;

  // eslint-disable-next-line unicorn/no-null
  $: setProduct({ ...data, oldProductId: null });
</script>

{#if $product}
  <Seo
    title={`${$product.sku.name} / #${$product.serialNumber}`}
    image={chooseSkuSocialImage($product.sku)}
    ogDescription={$product.sku?.descriptionShort}
  />
  <ProductPage tab={data.tab} />
{/if}
