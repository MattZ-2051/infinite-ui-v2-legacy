<script lang="ts">
  import type { CollectorProduct, Sku } from '$lib/sku-item/types';
  import debounce from 'just-debounce';
  import { mdiMagnify } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Pagination } from '$ui/pagination';
  import Sort from '$lib/components/Sort.svelte';
  import { Checkbox } from '$ui/checkbox';
  import { Breadcrumb, BreadcrumbItem } from '$ui/breadcrumbs';
  import { gotoQueryParameters } from '$util/queryParameter';
  import routes from '$lib/routes';
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

  const onInputChange = debounce((event) => navigate({ search: event.target.value }), 300);

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

<div class="flex justify-evenly flex-col h-48 text-white">
  <Breadcrumb class="font-black italic" --breadcrumb-color="#7C7C7C">
    <BreadcrumbItem><a href={routes.marketplace}>Marketplace</a></BreadcrumbItem>
    <BreadcrumbItem><a href={routes.sku(sku._id)}>{sku.name}</a></BreadcrumbItem>
    <BreadcrumbItem class="text-gray-500">Collectors</BreadcrumbItem>
  </Breadcrumb>

  <div class="text-5xl">Collectors</div>
</div>
<div class="text-gray-500">
  <div class="flex flex-col justify-between w-full items-center md:flex-row gap-8 border-b border-gray-800 pb-3">
    <div class="flex flex-grow md:w-1/4 input">
      <Icon path={mdiMagnify} color="gray" class="mr-3" />
      <input
        type="text"
        value={search}
        on:input={onInputChange}
        class="search-input text-white border-none placeholder-gray-700 bg-primary w-full outline-none"
        placeholder="*Select an owner to place a bid"
      />
    </div>
    <div class="flex gap-8">
      <div class="flex gap-2 items-center">
        <Checkbox checked={forSale} on:change={onFilterChange}>
          <span>For Sale</span>
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
      <div class="text-xl pt-10 text-center font-bold italic">No collector editions found</div>
    {/each}
  </div>
  <Pagination {page} {total} {perPage} class="flex justify-end my-5" on:change={gotoPage} />
</div>

<style>
  .search-input::placeholder {
    @apply italic;
    @apply font-black;
  }
</style>
