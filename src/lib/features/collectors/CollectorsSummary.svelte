<script lang="ts">
  import type { CollectorProduct, Sku } from '$lib/sku-item/types';
  import { Pagination } from '$ui/pagination';
  import Sort from '$lib/components/Sort.svelte';
  import Search from '$lib/components/Search.svelte';
  import { gotoQueryParameters } from '$util/queryParameter';
  import CollectorItem from './CollectorItem.svelte';
  import { loading } from './collectors.api';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let page: number;
  export let search: string;
  export let total: number;
  export let perPage: number;

  const onFilter = (event: CustomEvent) => {
    const { key, value } = event.detail;
    navigate({
      [key]: `${value}`,
      page: false,
    });
  };

  const sortOptions = [
    {
      name: 'Serial A to Z',
      value: 'serialNumber:asc',
    },
    {
      name: 'Serial Z to A',
      value: 'serialNumber:desc',
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

  const statusOptions = [
    {
      name: 'All for sale',
      value: '',
    },
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Auction Only',
      value: 'auction',
    },
    {
      name: 'Buy Now Only',
      value: 'fixed',
    },
  ];

  const gotoPage = (event: CustomEvent) => {
    navigate({ page: +event.detail.value });
  };

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
    <div class="flex-1 collector-custom-search-input">
      <Search placeholder="Search an owner" value={search} on:input={handleInput} />
    </div>
  </div>
  <div class="flex gap-8">
    <div class="flex gap-2 items-end">
      <Sort sortOptions={statusOptions} on:select={onFilter} key="saleType" label="Sale Type:" iconType="filter" />
    </div>
    <div class="flex cursor-pointer gap-2">
      <Sort {sortOptions} on:select={onFilter} />
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
<Pagination {page} {total} {perPage} class="flex justify-end my-5 pr-4 md:pr-8" on:change={gotoPage} />

<style lang="postcss">
  .collector-custom-search-input {
    border: var(--border-input-search, 0px);
    border-radius: var(--border-radius-input-search, 0px);
    padding: var(--input-search-padding, 0px);
    border-color: var(--border-input-search-color, none);
  }
</style>
