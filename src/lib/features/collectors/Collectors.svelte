<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import SkuDetails from '$lib/sku-item/SkuDetails.svelte';
  import CollectorsSummary from './CollectorsSummary.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let page: number;
  export let forSale: boolean;
  export let sort: 'asc' | 'desc';
  export let search: string;
  export let total: number;
  export let perPage: number;
</script>

<div class="flex bg-gray-900 flex-grow">
  <div class="flex container py-0">
    <div class="flex flex-col flex-auto lg:flex-row">
      <div class="lg:max-w-md -container-x lg:-container-none">
        <SkuDetails {sku} />
      </div>
      <div class="flex-grow pt-6 pl-0 pb-16 lg:pl-16 lg:pb-0">
        <CollectorsSummary {sku} {collectors} {page} {forSale} {sort} {search} {total} {perPage} />
      </div>
    </div>
  </div>
</div>
