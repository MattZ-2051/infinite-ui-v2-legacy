<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, Profile, Series } from '$lib/sku-item/types';
  import { loadMarketplaceFilters, loadMarketplaceItems } from '$lib/features/marketplace/marketplace.api';

  export async function load({ fetch, page }: LoadInput) {
    const [filters, items] = await Promise.all([
      loadMarketplaceFilters({ fetch }),
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
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Marketplace from '$lib/features/marketplace/Marketplace.svelte';

  export let skus: Sku[];
  export let total: number;
  export let categories: { id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
</script>

<Seo title="Marketplace" />

<Marketplace {skus} {total} {categories} {creators} {series} />
