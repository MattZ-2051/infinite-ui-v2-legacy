<script lang="ts">
  import type { Sku, Profile, Series } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import { SkuItemGrid } from '$lib/sku-item';
  import NoResults from '$lib/components/NoResults.svelte';
  import filters from '$static/filters.svg';
  import { Pagination } from '$ui/pagination';
  import { formatInteger } from '$util/format';
  import Search from './Search.svelte';
  import Filters from './Filters.svelte';
  import Sort from './Sort.svelte';
  import { loading } from './marketplace.api';
  import { statusFilters, setFilters } from './marketplace.service';

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
    setFilters({ params: { page: event.detail.value } });
  }

  const sort = (event: CustomEvent) => {
    setFilters({ params: { sortBy: `${event.detail.value}:${event.detail.order}` } });
  };

  $: p = +$page.query.get('page') || 1;
</script>

<div class="container flex gap-8 flex-col pt-6 md:grid marketplace-container">
  <div class={`${showFilters ? 'hidden' : 'flex'} md:flex justify-between`}>
    <h1 class="self-start text-5xl title">MarketPlace</h1>
    <div on:click={() => (showFilters = true)} class="relative w-10 h-10 self-end bg-gray-200 rounded-2xl md:hidden">
      <img src={filters} alt="Filters" class="absolute top-2 left-2" />
    </div>
  </div>
  <div class="py-3 gap-2 {showFilters ? 'hidden' : 'flex'}">
    {#if !showFilters}
      <div class="flex flex-grow items-center gap-2 text-gray-400 cursor-pointer md:hidden">
        {#each statusFilters as { label, status } (status)}
          {#if status ? $page.query.get('status') === status : !$page.query.get('status')}
            <span class="text-black text-2xl filter-summary">{label}</span>
            <span class="italic font-black">({formatInteger(total)})</span>
          {/if}
        {/each}
      </div>
    {/if}
    <div class="flex-grow flex">
      <div class="hidden self-center md:flex">
        <Search />
      </div>
      <div class="flex-grow self-center sort-container">
        <Sort on:select={sort} />
      </div>
    </div>
  </div>
  <div class={`md:inline ${!showFilters ? 'hidden' : 'inline'}`}>
    <Filters {categories} {creators} {series} {total} on:close={closeFilters} />
  </div>
  <div class={`md:inline ${showFilters ? 'hidden' : 'inline'}`} class:opacity-40={$loading}>
    {#if !$loading && skus.length === 0}
      <NoResults class="mt-4 md:mt-12 text-gray-400" />
    {:else}
      <SkuItemGrid {skus} />
      <Pagination page={p} {total} perPage={6} class="flex justify-end" on:change={gotoPage} />
    {/if}
  </div>
</div>

<style lang="postcss">
  .marketplace-container {
    grid-template-columns: 300px auto;
  }
  .title:container(320 > width) {
    @apply text-2xl;
  }
  .filter-summary:container(150 > width) {
    @apply text-sm;
  }
  .sort-container:container(width > 220) {
    @apply text-lg;
  }
</style>
