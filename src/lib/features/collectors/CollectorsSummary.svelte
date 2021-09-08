<script lang="ts">
  import type { CollectorProduct, Sku } from '$lib/sku-item/types';
  import { Pagination } from '$ui/pagination';
  import Sort from '$lib/components/Sort.svelte';
  import Search from '$lib/components/Search.svelte';
  import { Checkbox } from '$ui/checkbox';
  import { gotoQueryParameters } from '$util/queryParameter';
  import CollectorItem from './CollectorItem.svelte';
  import { loading } from './collectors.api';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let forSale: boolean;
  export let page: number;
  export let search: string;
  export let total: number;
  export let perPage: number;

  const sort = (event: CustomEvent) => {
    navigate({
      sortBy: `${event.detail.value}:${event.detail.order}`,
      page,
    });
  };

  const sortOptions = [
    {
      id: 1,
      name: 'Serial A to Z',
      order: 'asc',
      value: 'serialNumber',
    },
    {
      id: 2,
      name: 'Serial Z to A',
      order: 'desc',
      value: 'serialNumber',
    },
  ];

  const gotoPage = (event: CustomEvent) => {
    navigate({ page: +event.detail.value });
  };

  const handleInput = (event: Event) => navigate({ search: (event.target as HTMLInputElement).value });

  const onFilterChange = () => {
    navigate({ forSale: !forSale });
  };

  function navigate(parameters): void {
    gotoQueryParameters(
      {
        params: { page: false, ...parameters },
      },
      { noscroll: true, keepfocus: true }
    );
  }
</script>

<div class="flex flex-col md:flex-row justify-between w-full items-center gap-8 pb-10">
  <div class="flex w-full">
    <div class="flex-1">
      <Search placeholder="Select an owner to place a bid" value={search} on:input={handleInput} />
    </div>
  </div>
  <div class="flex gap-8">
    <div class="flex gap-2 items-end">
      <Checkbox checked={forSale} on:change={onFilterChange}>
        <span class="whitespace-nowrap">For Sale</span>
      </Checkbox>
    </div>
    <div class="flex cursor-pointer gap-2">
      <Sort {sortOptions} on:select={sort} />
    </div>
  </div>
</div>
<div class:opacity-50={$loading}>
  {#each collectors as collector}
    <CollectorItem {collector} redeemable={sku?.redeemable} />
  {:else}
    <div class="no-results">No collector editions found</div>
  {/each}
</div>
<Pagination {page} {total} {perPage} class="flex justify-end my-5" on:change={gotoPage} />
