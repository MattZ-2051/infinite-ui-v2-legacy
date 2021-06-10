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
  import Landing from '$lib/features/landing/Landing.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<Landing {skus} {products} />
