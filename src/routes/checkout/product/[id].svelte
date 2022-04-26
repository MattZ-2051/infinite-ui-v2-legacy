<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { product, fetchProductFx, setProduct } from '$lib/features/product/product.store';
  import routes from '$project/routes';

  const CHECKOUT_PHASE_ENABLED = import.meta.env?.VITE_CURRENT_PHASE;

  export const load: Load = async ({ url, params, fetch }) => {
    if (CHECKOUT_PHASE_ENABLED && CHECKOUT_PHASE_ENABLED !== '3') {
      return {
        status: 302,
        redirect: routes.index,
      };
    }

    const { id } = params;
    const page = +url.searchParams.get(`page`) || 1;
    const tab = url.searchParams.get(`tab`) as 'auction' | 'history' | 'owner';

    return {
      props: { data: await fetchProductFx({ id, tab, page, fetch }) },
    };
  };
</script>

<script lang="ts">
  import Checkout from '$lib/features/checkout/Checkout.svelte';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let data: Awaited<ReturnType<typeof fetchProductFx>>;

  // eslint-disable-next-line unicorn/no-null
  $: setProduct({ ...data, oldProductId: null });
</script>

{#if $product}
  <Seo title={`${$product.sku.name} / #${$product.serialNumber}`} image={chooseSkuSocialImage($product.sku)} />
  <Checkout product={$product} />
{/if}
