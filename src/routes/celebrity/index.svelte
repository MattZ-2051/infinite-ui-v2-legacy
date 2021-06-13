<script context="module" lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { loadItems } from '$lib/features/celebrity/celebrity.api';

  export async function load({ fetch }) {
    return {
      props: await loadItems({ fetch }),
    };
  }
</script>

<script lang="ts">
  import Celebrity from '$lib/features/celebrity/Celebrity.svelte';

  export let items: Sku[];
</script>

<Celebrity {items} />
