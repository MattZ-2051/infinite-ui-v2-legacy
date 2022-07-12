<script lang="ts">
  import type { Sku, SortOption } from '$lib/sku-item/types';
  import type { CollectorProductV2 } from '$lib/infinite-api-sdk/types';
  import { PaginationCursor } from '$ui/pagination';
  import Sort from '$lib/components/Sort.svelte';
  import { page as pageState } from '$app/stores';
  import { setFilters } from '$lib/features/marketplace/marketplace.service';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Search from '$lib/components/search/Search.svelte';
  import { getQueryParameters, gotoQueryParameters } from '$util/queryParameter';
  import CollectorItem from './CollectorItem.svelte';
  import { loading } from './collectors.api';
  import {
    INITIAL_SORT_OPTIONS,
    INITIAL_SORT_OPTIONS_MINT_LATER,
    INITIAL_SALE_TYPE_OPTIONS,
    INITIAL_MINT_STATUS_OPTIONS,
  } from './constants';

  export let sku: Sku;
  export let collectors: CollectorProductV2[];
  export let search: string;
  export let total: number;
  export let hasNext: boolean;
  export let hasPrevious: boolean;

  const isEthCurrency = sku.currency === 'ETH';

  const onFilter = (event: CustomEvent) => {
    const { key, value } = event.detail;
    const oldFilters = handleChangeSortLists(value, key);
    navigate({
      ...oldFilters,
      page: false,
    });
  };

  let sortOptions: SortOption[] = isEthCurrency ? INITIAL_SORT_OPTIONS_MINT_LATER : INITIAL_SORT_OPTIONS;
  let saleTypeOptions: SortOption[] = INITIAL_SALE_TYPE_OPTIONS;
  let statusOptions: SortOption[] = INITIAL_MINT_STATUS_OPTIONS;
  let perPage = 6;

  $: currentPage = +getQueryParameters().get('page') || 1;

  const handleChangeSortLists = (value: string, key: string) => {
    let sortBy = $pageState.url.searchParams.get('sortBy') || '';
    let saleType = $pageState.url.searchParams.get('saleType') || '';
    let mintStatus = $pageState.url.searchParams.get('mintStatus') || '';
    if (key === 'sortBy') {
      if (value.includes('price') && saleType.includes('all') && !sortBy.includes('price')) {
        saleType = '';
      }
    } else if (key === 'saleType' && value.includes('all') && sortBy.includes('price') && !saleType.includes('all')) {
      sortBy = 'serialNumber:asc';
    } else if (key === 'mintStatus' && value.includes('all')) {
      mintStatus = '';
    }
    return {
      sortBy,
      saleType,
      mintStatus,
      [key]: value,
    };
  };

  function goNext(event: CustomEvent) {
    currentPage = event.detail.page;
    navigate({ lastId: collectors.slice(-1)[0]._id, firstId: collectors[0]._id, isReverse: false, page: currentPage });
  }

  function goPrevious(event: CustomEvent) {
    currentPage = event.detail.page;
    navigate({ lastId: collectors.slice(-1)[0]._id, firstId: collectors[0]._id, isReverse: true, page: currentPage });
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

  const handleInput = (event: Event) => navigate({ search: (event.target as HTMLInputElement).value });

  function navigate(parameters): void {
    gotoQueryParameters(
      {
        params: { page: false, ...parameters },
      },
      { noscroll: true, keepfocus: true }
    );
  }
</script>

<div class="flex flex-col md:flex-row justify-between w-full items-center gap-8 px-4 md:px-8 pb-10">
  <div class="flex w-full">
    <ThemeContext id="search-bar">
      <div class="flex-1 collector-custom-search-input">
        <Search placeholder="Search item" value={search} on:input={handleInput} />
      </div>
    </ThemeContext>
  </div>
  <div class="flex gap-8">
    <div class="flex gap-2 items-end">
      {#if isEthCurrency}
        <Sort sortOptions={statusOptions} on:select={onFilter} key="mintStatus" label="Status:" iconType="filter" />
      {:else}
        <Sort sortOptions={saleTypeOptions} on:select={onFilter} key="saleType" label="Sale Type:" iconType="filter" />
      {/if}
    </div>
    <div class="flex cursor-pointer gap-2">
      <Sort {sortOptions} on:select={onFilter} key="sortBy" />
    </div>
  </div>
</div>
<div class:opacity-50={$loading}>
  {#each collectors as collector}
    <CollectorItem {collector} redeemable={sku?.redeemable} currency={sku.currency} />
  {:else}
    <div class="no-results">No collector editions found</div>
  {/each}
</div>
<PaginationCursor
  {hasNext}
  {hasPrevious}
  {total}
  page={currentPage}
  {perPage}
  loading={$loading}
  class="flex justify-center my-5 pr-4 md:pr-8"
  on:next={goNext}
  on:prev={goPrevious}
  on:firstPage={goToFirstPage}
/>

<style lang="postcss">
  .collector-custom-search-input {
    border: var(--border-input-search, 0px);
    border-radius: var(--border-radius-input-search, 0px);
    padding: var(--input-search-padding, 0px);
    border-color: var(--border-input-search-color, none);
  }
</style>
