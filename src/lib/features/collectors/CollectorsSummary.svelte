<script lang="ts">
  import type { CollectorProduct, Sku } from '$lib/sku-item/types';
  import debounce from 'just-debounce';
  import { mdiChevronDown, mdiChevronUp, mdiMagnify } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Pagination, PaginationVariantDark } from '$ui/pagination';
  import { Checkbox, CheckboxVariantDark } from '$ui/checkbox';
  import { gotoQueryParameters } from '$util/queryParameter';
  import Breadcrumbs from '$ui/breadcrumbs/Breadcrumbs.svelte';
  import CollectorItem from './CollectorItem.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let sort: 'asc' | 'desc';
  export let forSale: boolean;
  export let page: number;
  export let search: string;
  export let total: number;
  export let perPage: number;

  const toggleSort = () => {
    navigate({
      sort: sort === 'asc' ? 'desc' : 'asc',
      page,
    });
  };

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

  const items = [
    { text: 'Marketplace', href: '/marketplace', limit: 600 },
    { text: sku.name, href: `/marketplace/${sku._id}` },
    { text: 'Collectors', class: 'text-gray-500' },
  ];
</script>

<div class="flex justify-evenly flex-col h-48 text-white">
  <Breadcrumbs
    {items}
    class="flex gap-x-3 gap-y-1 font-black italic"
    itemClass="whitespace-nowrap"
    dividerClass="text-gray-500"
  />

  <div class="flex flex-wrap gap-7 sm:gap-0">
    <span class="text-5xl">Collectors</span>
  </div>
</div>
<div class="text-gray-500">
  <div class="flex flex-col justify-between w-full items-center md:flex-row gap-8 border-b border-gray-800 pb-3">
    <div class="flex flex-grow md:w-1/4 input">
      <Icon path={mdiMagnify} color="gray" class="mr-3" />
      <input
        type="text"
        value={search}
        on:input={onInputChange}
        class="search-input text-white border-none placeholder-gray-700 bg-gray-900 w-full outline-none"
        placeholder="*Select an owner to place a bid"
      />
    </div>
    <div class="flex gap-8">
      <div class="flex gap-2 items-center">
        <CheckboxVariantDark>
          <Checkbox checked={forSale} on:change={onFilterChange}>
            <span>For Sale</span>
          </Checkbox>
        </CheckboxVariantDark>
      </div>
      <div class="flex cursor-pointer gap-2" on:click={toggleSort}>
        <span>Sort by:</span>
        <span class="text-white">Serial</span>
        <Icon path={sort === 'asc' ? mdiChevronDown : mdiChevronUp} color="gray" class="mr-3" />
      </div>
    </div>
  </div>
  {#each collectors as collector}
    <CollectorItem {collector} redeemable={sku?.redeemable} />
  {/each}
  <PaginationVariantDark>
    <Pagination {page} {total} {perPage} class="flex justify-end mt-5" on:change={gotoPage} />
  </PaginationVariantDark>
</div>

<style>
  .search-input::placeholder {
    @apply italic;
    @apply font-black;
  }
</style>
