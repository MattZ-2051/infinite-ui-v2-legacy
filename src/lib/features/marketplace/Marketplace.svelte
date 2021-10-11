<script lang="ts">
  import type { Sku, Profile, Series } from '$lib/sku-item/types';
  import { mdiTuneVariant } from '@mdi/js';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import Sort from '$lib/components/Sort.svelte';
  import Search from '$lib/components/Search.svelte';
  import { media } from '$lib/media-query.store';
  import { Pagination } from '$ui/pagination';
  import NoResults from './NoResults.svelte';
  import Filters from './Filters.svelte';
  import { loading, perPage } from './marketplace.api';
  import { setFilters } from './marketplace.service';

  export let skus: Sku[];
  export let total: number;
  export let maxPrice: number;
  export let categories: { _id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
  export let contentTotal: number;

  let showFilters = false;
  let scrollY: number;

  const closeFilters = (): void => {
    showFilters = false;
    scrollY = 0;
  };

  function gotoPage(event: CustomEvent) {
    setFilters({ params: { page: event.detail.value } }, { noscroll: false });
  }

  const sort = (event: CustomEvent) => {
    setFilters({ params: { [event.detail.key]: `${event.detail.value}`, page: false } });
  };

  const handleInput = (event: Event) => setFilters({ params: { search: (event.target as HTMLInputElement).value } });

  const sortOptions = [
    {
      name: 'Release date',
      value: 'startDate:asc',
    },
    {
      name: 'Price high to low',
      value: 'price:desc',
    },
    {
      name: 'Price low to high',
      value: 'price:asc',
    },
  ];

  $: p = +$page.query.get('page') || 1;
</script>

<svelte:window bind:scrollY />

<div class="container flex gap-8 flex-col pt-6 md:grid marketplace-container">
  <div class={`${showFilters && !$media.md ? 'hidden' : 'flex'} md:flex items-center justify-between`}>
    <h1 class="text-4xl title">Marketplace</h1>
    <button
      type="button"
      on:click={() => (showFilters = true)}
      class="w-10 h-10 bg-gray-200 rounded-full md:hidden flex items-center justify-center"
    >
      <Icon path={mdiTuneVariant} />
    </button>
  </div>
  <div class="gap-2 {showFilters && !$media.md ? 'hidden' : 'flex'}">
    <div class="flex flex-wrap items-center justify-end md:justify-between w-full">
      <div class="py-3 flex-1">
        <Search on:input={handleInput} value={$page.query.get('search') || ''} />
      </div>
      <div class="py-3 ml-12 sort-container">
        <Sort on:select={sort} {sortOptions} />
      </div>
    </div>
  </div>
  <div class:hidden={!showFilters} class="md:block">
    <Filters {categories} {creators} {series} {total} {maxPrice} {contentTotal} on:close={closeFilters} />
  </div>
  <div class="inline" class:opacity-40={$loading}>
    {#if !$loading && skus.length === 0}
      <NoResults class="mt-4 md:mt-12" />
    {:else}
      <SkuItemGrid {skus} maxCols={3} />
      <Pagination page={p} {total} {perPage} class="my-8 flex justify-end" on:change={gotoPage} />
    {/if}
  </div>
</div>

<style lang="postcss">
  .marketplace-container {
    grid-template-columns: 320px auto;
  }
  .title {
    color: var(--marketplace-heading-color);
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
