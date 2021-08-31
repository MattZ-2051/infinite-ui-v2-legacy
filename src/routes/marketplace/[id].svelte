<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuFx, setSku } from '$lib/features/sku/sku.store';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    return {
      props: { data: await loadSkuFx({ id, fetch }) },
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import SkuContainer from '$lib/features/sku/Sku.svelte';

  export let data: Awaited<ReturnType<typeof loadSkuFx>>;

  $: setSku(data);
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} />

<SkuContainer />
