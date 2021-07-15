<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { loadSku } from '$lib/features/celebrity/sku/celebritySku.api';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    return {
      props: await loadSku({ id, fetch }),
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import CelebritySku from '$lib/features/celebrity/sku/CelebritySku.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let totalCollectors: number;
  export let related: Sku[];
</script>

<Seo title={sku.name} image={chooseSkuSocialImage(sku)} />

<CelebritySku {sku} {collectors} {totalCollectors} {related} />
