<script context="module" lang="ts">
  import { loadFeatured } from '$lib/features/landing/landing.api';

  export async function load({ fetch }) {
    return {
      props: await loadFeatured({ fetch }),
    };
  }
</script>

<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Landing from '$lib/features/landing/Landing.svelte';

  export let items: Sku[];
</script>

<Landing {items} />
