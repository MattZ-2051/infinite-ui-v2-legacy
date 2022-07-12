<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Sku } from '$lib/sku-item/types';
  import type { CollectorProductV2 } from '$lib/infinite-api-sdk/types';
  import debounce from 'p-debounce';
  import { browser } from '$app/env';
  import Collectors from '$lib/features/collectors/Collectors.svelte';
  import { loadCollectorProducts } from '$lib/features/collectors/collectors.api';

  export const load = debounce(
    <Load>(async ({ url, params, fetch }) => {
      const { id } = params;
      return {
        props: await loadCollectorProducts({ id, fetch, query: url.searchParams }),
      };
    }),
    browser ? 300 : 0
  );
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let sku: Sku;
  export let collectors: CollectorProductV2[];
  export let search: string;
  export let total: number;
  export let hasNext: boolean;
  export let hasPrevious: boolean;
</script>

<Seo title={sku.name} image={chooseSkuSocialImage(sku)} />

<Collectors {sku} {collectors} {search} {total} {hasNext} {hasPrevious} />
