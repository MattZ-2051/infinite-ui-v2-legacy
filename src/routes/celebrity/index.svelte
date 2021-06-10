<script context="module" lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { loadReleases } from '$lib/features/celebrity/celebrity.api';

  export async function load({ fetch }) {
    return {
      props: await loadReleases({ fetch }),
    };
  }
</script>

<script lang="ts">
  import Celebrity from '$lib/features/celebrity/Celebrity.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<Celebrity {skus} {products} />
