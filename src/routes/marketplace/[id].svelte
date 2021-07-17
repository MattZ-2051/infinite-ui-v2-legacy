<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import { loadSku } from '$lib/features/sku/sku.api';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    return {
      props: await loadSku({ id, fetch }),
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import SkuContainer from '$lib/features/sku/Sku.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let totalCollectors: number;
  export let related: Sku[];
</script>

<Seo title={sku.name} image={chooseSkuSocialImage(sku)} />

<SkuContainer {sku} {collectors} {totalCollectors} {related} />
