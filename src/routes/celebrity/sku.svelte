<script context="module" lang="ts">
  import type { Sku, Collector } from '$lib/sku-item/types';
  import { loadSku } from '$lib/features/celebrity/sku/celebritySku.api';

  export async function load({ fetch }) {
    return {
      props: await loadSku({ fetch }),
    };
  }
</script>

<script lang="ts">
  import CelebritySku from '$lib/features/celebrity/sku/CelebritySku.svelte';

  export let sku: Sku;
  export let collectors: Collector[];
  export let related: Sku[];
</script>

<CelebritySku {sku} {collectors} {related} />
