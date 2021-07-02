<script lang="ts">
  import type { Sku, Profile, Series } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { SkuItemGrid } from '$lib/sku-item';
  import filters from '$static/filters.svg';
  import { Pagination } from '$ui/pagination';
  import { formatInteger } from '$util/format';
  import { handleQueryParameter } from '$util/queryParameter';
  import Search from './Search.svelte';
  import Filters from './Filters.svelte';
  import { loading } from './marketplace.api';
  import { statusFilters } from './marketplace.service';

  export let skus: Sku[];
  export let total: number;
  export let categories: { id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];

  let showFilters = false;

  const closeFilters = (): void => {
    showFilters = false;
  };

  function gotoPage(event: CustomEvent) {
    goto(handleQueryParameter({ base: `/marketplace`, params: { page: event.detail.value } }));
  }

  $: p = +$page.query.get('page') || 1;
</script>

<div class="container flex gap-8 flex-col pt-6 md:grid md:grid-cols-4">
  <div class={`${showFilters ? 'hidden' : 'flex'} md:flex`}>
    <h1 class="self-start flex-auto text-5xl">MarketPlace</h1>
    <div on:click={() => (showFilters = true)} class="relative w-10 h-10 self-end bg-gray-200 rounded-2xl md:hidden">
      <img src={filters} alt="Filters" class="absolute top-2 left-2" />
    </div>
  </div>
  {#if !showFilters}
    <div class="flex items-center gap-2 py-3 text-gray-400 cursor-pointer md:hidden">
      {#each statusFilters as { label, status } (status)}
        {#if status ? $page.query.get('status') === status : !$page.query.get('status')}
          <span class="text-black text-2xl">{label}</span>
          <span class="italic font-black">({formatInteger(total)})</span>
        {/if}
      {/each}
    </div>
  {/if}
  <div class="hidden self-center md:col-span-3 md:flex">
    <Search />
  </div>
  <div class={`md:inline ${!showFilters ? 'hidden' : 'inline'}`}>
    <Filters {categories} {creators} {series} {total} on:close={closeFilters} />
  </div>
  <div class={`md:inline md:col-span-3 ${showFilters ? 'hidden' : 'inline'}`} class:opacity-40={$loading}>
    <SkuItemGrid {skus} maxCols={3} />
    <Pagination page={p} {total} perPage={6} class="flex justify-end" on:change={gotoPage} />
  </div>
</div>
