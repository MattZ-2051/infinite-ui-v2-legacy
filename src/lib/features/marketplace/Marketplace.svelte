<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { SkuItemGrid } from '$lib/sku-item';
  import filters from '$static/filters.svg';
  import Pagination from '$ui/pagination/Pagination.svelte';
  import Search from './Search.svelte';
  import Filters from './Filters.svelte';

  export let skus: Sku[];
  export let categories: { id: string; name: string }[];

  let showFilters = false;

  const closeFilters = (): void => {
    showFilters = false;
  };
</script>

<div class="container flex gap-8 flex-col pt-6 md:grid md:grid-cols-4">
  <div class={`${showFilters ? 'hidden' : 'flex'} md:flex`}>
    <h1 class="self-start flex-auto text-5xl">MarketPlace</h1>
    <div
      on:click={() => (showFilters = true)}
      class="relative w-10 h-10 self-end bg-gray-200 rounded-2xl md:hidden"
    >
      <img src={filters} alt="Filters" class="absolute top-2 left-2" />
    </div>
  </div>
  {#if !showFilters}
    <div class="flex items-center gap-2 py-3 text-gray-400 cursor-pointer md:hidden">
      <span class="text-black text-2xl">All</span>
      <span class="italic font-black">(12244)</span>
    </div>
  {/if}
  <div class="hidden self-center md:col-span-3 md:flex">
    <Search />
  </div>
  <div class={`md:inline ${!showFilters ? 'hidden' : 'inline'}`}>
    <Filters {categories} on:close={closeFilters} />
  </div>
  <div class={`md:inline md:col-span-3 ${showFilters ? 'hidden' : 'inline'}`}>
    <SkuItemGrid {skus} maxCols={3} />
    <Pagination total={94} class="flex justify-end" />
  </div>
</div>
