<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import { loadSkuFx, clearSku, sku } from '$lib/features/sku/sku.store';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    await loadSkuFx({ id, fetch });
    return {};
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import { navigating } from '$app/stores';
  import SkuContainer from '$lib/features/sku/Sku.svelte';
  import routes from '$lib/routes';

  function resetStore(path: string) {
    // Leaving current product page
    if (path && path !== routes.sku($sku._id)) {
      setTimeout(() => clearSku(), 500);
    }
  }

  $: resetStore($navigating?.to?.path);
</script>

<Seo title={$sku.name} image={chooseSkuSocialImage($sku)} />

<SkuContainer />
