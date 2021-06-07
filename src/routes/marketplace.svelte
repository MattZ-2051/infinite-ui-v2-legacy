<script context="module">
  export async function load({ fetch }) {
    const res = await fetch(
      `https://api.goinfinite.io/skus/tiles/?page=1&per_page=50&sortBy=startDate:1`
    );
    return {
      props: {
        items: await res.json(),
      },
    };
  }
</script>

<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Filters from '$lib/filters/Filters.svelte';
  import Search from '$lib/search/Search.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import filters from '$static/filters.svg';

  let showFilters = false;
  export let items: Sku[];

  const closeFilters = (): void => {
    showFilters = false;
  };
</script>

<div class="container flex gap-8 flex-col p-6 md:grid md:grid-cols-4">
  <div class={`${showFilters ? 'hidden' : 'flex'} md:flex`}>
    <h1 class="self-start flex-auto text-5xl">MarketPlace</h1>
    <div
      on:click={() => (showFilters = true)}
      class="relative w-10 h-10 self-end bg-gray-200 rounded-2xl md:hidden"
    >
      <img src={filters} class="absolute top-2 left-2" />
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
    <Filters on:close={closeFilters} />
  </div>
  <div class={`md:inline md:col-span-3 ${showFilters ? 'hidden' : 'inline'}`}>
    <SkuItemGrid {items} />
  </div>
</div>
