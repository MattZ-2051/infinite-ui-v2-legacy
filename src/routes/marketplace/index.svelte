<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Profile, Series } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import debounce from 'p-debounce';
  import { browser } from '$app/env';
  import { loadMarketplaceFilters, loadMarketplaceItems } from '$lib/features/marketplace/marketplace.api';
  import { variables } from '$lib/variables';
  import routes from '$project/routes';

  const DISABLED_MARKETPLACE = variables.disabledMarketplace;
  const EXTERNAL_INDEX_URL = import.meta.env?.VITE_EXTERNAL_INDEX_URL as string;

  const index = EXTERNAL_INDEX_URL ? EXTERNAL_INDEX_URL : routes.index;

  export const load = debounce(
    <Load>(async ({ fetch, url }) => {
      if (DISABLED_MARKETPLACE) {
        return {
          status: 302,
          redirect: index,
        };
      }

      const [filters, { results: data, hasNext, hasPrevious, total }] = await Promise.all([
        loadMarketplaceFilters({ fetch, query: url.searchParams }),
        loadMarketplaceItems({ fetch, query: url.searchParams }),
      ]);

      return {
        props: {
          ...filters,
          skus: data,
          total,
          hasNext,
          hasPrevious,
        },
      };
    }),
    browser ? 300 : 0
  );
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Marketplace from '$lib/features/marketplace/Marketplace.svelte';

  export let skus: SkuV2[];
  export let total: number;
  export let hasNext: boolean;
  export let hasPrevious: boolean;
  export let maxPrice: number;
  export let categories: { _id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
</script>

<Seo title="Marketplace" />

<Marketplace {skus} {hasNext} {hasPrevious} {total} {maxPrice} {categories} {creators} {series} />
