<script context="module" lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { loadFeatured } from '$lib/features/landing/landing.api';

  export async function load({ fetch }) {
    return {
      props: await loadFeatured({ fetch }),
    };
  }
</script>

<script lang="ts">
  // eslint-disable-next-line import/order
  import SvelteSeo from 'svelte-seo';
  import Landing from '$lib/features/landing/Landing.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<SvelteSeo
  openGraph={{
    title: 'The ARIA Exchange - Coming Soon',
    type: 'website',
    images: [
      {
        url: 'https://thearianetwork.com/wp-content/uploads/2021/06/aria_exchange_share_image-01.jpg',
        width: 1216,
        height: 740,
        alt: 'The ARIA Exchange',
      },
    ],
  }}
/>

<Landing {skus} {products} />
