<script context="module" type="ts">
  export async function load({ fetch }) {
    const res = await fetch(
      `https://api.goinfinite.io/skus/tiles/?page=1&per_page=50&sortBy=startDate:1`
    );
    return {
      props: {
        items: await res.json(),
      },
    };
  }
</script>

<script lang="ts">
  import Celebrity from '$lib/celebrity/Celebrity.svelte';
  import type { Sku } from '$lib/sku-item/types';

  export let items: Sku[];
</script>

<Celebrity {items} />
