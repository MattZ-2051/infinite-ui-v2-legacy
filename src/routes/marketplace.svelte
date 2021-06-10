<script context="module" lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { loadCategoriesItems } from '$lib/features/marketplace/marketplace.api';

  export async function load({ fetch }) {
    return {
      props: await loadCategoriesItems({ fetch }),
    };
  }
</script>

<script lang="ts">
  import Marketplace from '$lib/features/marketplace/Marketplace.svelte';

  export let skus: Sku[];
  export let categories: { id: string; name: string }[];
</script>

<Marketplace {skus} {categories} />
