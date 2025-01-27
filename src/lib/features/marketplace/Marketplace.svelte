<script lang="ts">
  import type { Profile, Series } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { mdiTuneVariant } from '@mdi/js';
  import debounce from 'just-debounce';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import Sort from '$lib/components/Sort.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/search/Search.svelte';
  import { media } from '$lib/media-query.store';
  import { PaginationCursor } from '$ui/pagination';
  import NoResults from '$lib/features/marketplace/NoResults.svelte';
  import { getQueryParameters } from '$util/queryParameter';
  import Filters from './Filters.svelte';
  import { loading } from './marketplace.api';
  import { setFilters } from './marketplace.service';

  export let skus: SkuV2[];
  export let total: number;
  export let hasNext: boolean;
  export let hasPrevious: boolean;
  export let maxPrice: number;
  export let categories: { _id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];

  let showFilters = false;
  let scrollY: number;
  let termInputSearch: string;
  let perPage = 9;

  const closeFilters = (): void => {
    showFilters = false;
    scrollY = 0;
  };

  $: currentPage = +getQueryParameters().get('page') || 1;

  function goNext(event: CustomEvent) {
    currentPage = event.detail.page;
    setFilters(
      {
        params: {
          lastId: skus.slice(-1)[0]?._id,
          firstId: skus[0]?._id,
          isReverse: false,
          page: currentPage,
        },
      },
      { noscroll: false }
    );
  }

  function goPrevious(event: CustomEvent) {
    currentPage = event.detail.page;
    setFilters(
      {
        params: {
          lastId: skus.slice(-1)[0]?._id,
          firstId: skus[0]?._id,
          isReverse: true,
          page: currentPage,
        },
      },
      { noscroll: false }
    );
  }

  function goToFirstPage() {
    currentPage = 1;
    setFilters(
      {
        params: {
          lastId: undefined,
          firstId: undefined,
          page: currentPage,
          isReverse: undefined,
        },
      },
      { noscroll: false }
    );
  }

  const sort = (event: CustomEvent) => {
    setFilters({ params: { [event.detail.key]: `${event.detail.value}`, page: false } });
  };

  const handleOnSearch = (value: string) => setFilters({ params: { search: value } });
  const handleInput = debounce((event: Event) => handleOnSearch((event.target as HTMLInputElement).value), 500);

  const sortOptions = [
    {
      name: 'Release date',
      value: 'minStartDate:asc',
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

  $: termInputSearch = $page.url.searchParams.get('search');

  const handleOnInputSearch = (event: Event) => {
    termInputSearch = (event.target as HTMLInputElement).value;
  };
</script>

<svelte:window bind:scrollY />

<div class="container lg:gap-y-1 lg:gap-18 flex gap-8 flex-col pt-6 lg:grid marketplace-container">
  <div class={`${showFilters && !$media.md ? 'hidden' : 'flex'} lg:flex items-center justify-between`}>
    <h1 class="text-4xl title">Marketplace</h1>
    <button
      type="button"
      on:click={() => (showFilters = true)}
      class="w-10 h-10 button-filter rounded-full lg:hidden flex items-center justify-center"
      aria-label="Show filters"
    >
      <Icon path={mdiTuneVariant} color="black" />
    </button>
  </div>
  <div class="gap-2 {showFilters && !$media.lg ? 'hidden' : 'flex'}">
    <div
      class="flex flex-wrap items-center justify-end lg:justify-between w-full"
      style="display: {!$loading && skus.length === 0 ? 'var(--marketplace-search-input-bar-top, flex)' : 'flex'}"
    >
      <ThemeContext id="search-bar">
        <div
          class="flex-1 marketplace-custom-search-input"
          style="margin:var(--container-search-margin, 0.75rem 0 0.75rem 0);"
        >
          <Search on:input={handleInput} value={$page.url.searchParams.get('search') || ''} />
        </div>
        <div class="py-3 ml-12 sort-container">
          <Sort on:select={sort} {sortOptions} />
        </div>
      </ThemeContext>
    </div>
  </div>
  <div class:hidden={!showFilters} class="lg:block">
    <Filters {categories} {creators} {series} hasResults={skus.length > 0} {maxPrice} on:close={closeFilters} />
  </div>
  <div class="inline" class:opacity-40={$loading}>
    {#if !$loading && skus.length === 0}
      <NoResults class="mt-4 lg:mt-12 items-center">
        <div slot="search-input" class="flex mb-6">
          <ThemeContext id="search-bar">
            <div class="flex items-center flex-1 mr-10 marketplace-custom-search-input">
              <Search value={termInputSearch} on:input={handleOnInputSearch} />
            </div>
          </ThemeContext>
          <Button variant="brand" on:click={() => handleOnSearch(termInputSearch || '')}>Search</Button>
        </div>
      </NoResults>
    {:else}
      <SkuItemGrid {skus} maxCols={3} />
      <PaginationCursor
        {hasNext}
        {hasPrevious}
        {total}
        page={currentPage}
        {perPage}
        loading={$loading}
        class="my-8 flex justify-center"
        on:next={goNext}
        on:prev={goPrevious}
        on:firstPage={goToFirstPage}
      />
    {/if}
  </div>
</div>

<style lang="postcss">
  .marketplace-container {
    grid-template-columns: 320px auto;
  }
  .title {
    color: var(--marketplace-heading-color);
    font-family: var(--market-heading-font);
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
  .button-filter {
    background-color: var(--button-marketplace-filter-color);
  }
  .marketplace-custom-search-input {
    border: var(--border-input-search, 0px);
    border-radius: var(--border-radius-input-search, 0px);
    padding: var(--input-search-padding, 0px);
    border-color: var(--border-input-search-color, none);
    height: var(--search-bar-height, 0.9rem);
  }
</style>
