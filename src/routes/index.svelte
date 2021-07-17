<script context="module" lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { loadFeatured } from '$lib/features/landing/landing.api';

  export async function load({ fetch }) {
    const skus = await loadFeatured({ fetch });
    return {
      props: { skus },
    };
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Landing from '$lib/features/landing/Landing.svelte';

  export let skus: Sku[];
</script>

<Seo />

<Landing {skus} />
