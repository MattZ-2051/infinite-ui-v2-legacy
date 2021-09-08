<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import debounce from 'p-debounce';
  import { browser } from '$app/env';
  import Collectors from '$lib/features/collectors/Collectors.svelte';
  import { loadCollectorProducts } from '$lib/features/collectors/collectors.api';

  export const load = debounce(
    async ({ page, fetch }: LoadInput) => {
      const { id } = page.params;
      return {
        props: await loadCollectorProducts({ id, fetch, query: page.query }),
      };
    },
    browser ? 300 : 0
  );
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let forSale: boolean;
  export let search: string;
  export let total: number;
  export let page: number;
  export let perPage: number;
</script>

<Seo title={sku.name} image={chooseSkuSocialImage(sku)} />

<Collectors {sku} {collectors} {forSale} {search} {total} {page} {perPage} />
