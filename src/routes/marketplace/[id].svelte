<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, Collector } from '$lib/sku-item/types';
  import { loadSku } from '$lib/features/celebrity/sku/celebritySku.api';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    return {
      props: await loadSku({ id, fetch }),
    };
  }
</script>

<script lang="ts">
  import CelebritySku from '$lib/features/celebrity/sku/CelebritySku.svelte';

  export let sku: Sku;
  export let collectors: Collector[];
  export let totalCollectors: number;
  export let related: Sku[];
</script>

<CelebritySku {sku} {collectors} {totalCollectors} {related} />
