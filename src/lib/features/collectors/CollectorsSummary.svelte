<script lang="ts">
  import debounce from 'just-debounce';
  import type { Collector, Sku } from '$lib/sku-item/types';
  import { mdiChevronRight, mdiChevronDown, mdiChevronUp, mdiMagnify } from '@mdi/js';
  import { goto } from '$app/navigation';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import Pagination from '$ui/pagination/Pagination.svelte';
  import { Checkbox, CheckboxVariantDark } from '$ui/checkbox';
  import { handleQueryParameter } from '$util/queryParameter';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';

  export let sku: Sku;
  export let collectors: Collector[];
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
    const url = handleQueryParameter({
      base: `/collectors/${sku._id}`,
      params: { page: false, ...parameters },
    });
    goto(url, { noscroll: true, keepfocus: true });
  }
</script>

<div class="flex justify-evenly flex-col h-48 text-white">
  <div class="font-black italic">
    <a class="lg:hidden" href="/marketplace">...</a>
    <a class="hidden lg:inline" href="/marketplace">Marketplace</a>
    <span class="mx-2 text-gray-500">/</span>
    <a sveltekit:prefetch href={`/marketplace/${sku._id}`}>{sku.name}</a>
    <span class="mx-2 text-gray-500">/</span>
    <span class="text-gray-500">Collectors</span>
  </div>
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
    <a href="/product/{collector._id}" class="self-end group-hover:text-white">
      <div
        class="grid-container group grid gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
      >
        <div>
          <div class="flex items-center gap-3 ">
            <span class="text-white font-normal">#{collector.serialNumber}</span>
            {#if sku?.redeemable}
              <IconRedeem
                class="text-black {collector.redeemedStatus === 'redeemed'
                  ? 'bg-gray-800'
                  : 'bg-white'} rounded-full p-1"
                tooltip={{
                  content: collector.redeemedStatus === 'redeemed' ? 'Redeemed' : 'Redeemable',
                  theme: 'white',
                }}
              />
            {/if}
          </div>
          <span class="italic font-black">@{collector.owner?.username}</span>
        </div>
        <div class="justify-self-end">
          {#if !collector.activeProductListing && !collector.upcomingProductListing}
            Not for sale
          {:else if collector.upcomingProductListing}
            Upcoming
          {:else if collector.salesType !== 'auction'}
            <div class="flex justify-end">
              <span>Sale for</span>
              <Icon path={mdiChevronRight} color="gray" />
              <span class="text-white">${collector.activeProductListing.price}</span>
            </div>
          {:else}
            <div class="flex justify-end">
              <span>Bid for</span>
              <Icon path={mdiChevronRight} color="gray" />
              <span class="text-white">${collector.activeProductListing.minBid}</span>
            </div>
          {/if}
          {#if collector.activeProductListing?.endDate}
            <div>
              Expires in
              <TimeDifference date={new Date(collector.activeProductListing.endDate)} />
            </div>
          {/if}
        </div>
        <Icon path={mdiChevronRight} color="gray" size="1.5" class="justify-self-end" />
      </div>
    </a>
  {/each}
  <Pagination {page} {total} {perPage} class="flex justify-end mt-5" on:change={gotoPage} />
</div>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
  .search-input::placeholder {
    @apply italic;
    @apply font-black;
  }
</style>
