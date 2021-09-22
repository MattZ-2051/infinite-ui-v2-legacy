<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, Profile, Series } from '$lib/sku-item/types';
  import debounce from 'p-debounce';
  import { browser } from '$app/env';
  import { loadMarketplaceFilters, loadMarketplaceItems } from '$lib/features/marketplace/marketplace.api';

  export const load = debounce(
    async ({ fetch, page }: LoadInput) => {
      const [filters, items] = await Promise.all([
        loadMarketplaceFilters({ fetch, query: page.query }),
        loadMarketplaceItems({ fetch, query: page.query }),
      ]);
      const { data, total } = items;

      return {
        props: {
          ...filters,
          skus: data,
          total,
        },
      };
    },
    browser ? 300 : 0
  );
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Marketplace from '$lib/features/marketplace/Marketplace.svelte';

  export let skus: Sku[];
  export let total: number;
  export let maxPrice: number;
  export let categories: { _id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
</script>

<Seo title="Marketplace" />

<Marketplace {skus} {total} {maxPrice} {categories} {creators} {series} />
