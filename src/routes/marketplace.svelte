<script context="module">
  import { loadCategoriesItems } from '$lib/features/marketplace/marketplace.api';

  export async function load({ fetch }) {
    return {
      props: await loadCategoriesItems({ fetch }),
    };
  }
</script>

<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Marketplace from '$lib/features/marketplace/Marketplace.svelte';

  export let items: Sku[];
  export let categories: { id: string; name: string }[];
</script>

<Marketplace {items} {categories} />
