<script lang="ts">
  import type { Profile, Series } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import { mdiChevronDown, mdiWindowClose } from '@mdi/js';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import RangeSlider from '$ui/rangeslider/RangeSlider.svelte';
  import { datePicker } from '$ui/datepicker/datepicker';
  import Checkbox from '$ui/checkbox/Checkbox.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { queryParameter } from '$util/queryParameter';

  const dispatch = createEventDispatcher();

  $: filters = [
    ...categorySelected.map((v) => ({ type: 'category', value: v })),
    ...seriesSelected.map((v) => ({ type: 'series', value: v })),
    ...creatorsSelected.map((v) => ({ type: 'creators', value: v })),
    ...(priceSelected ? [{ type: 'price', value: priceSelected }] : []),
  ];
  const removeFilter = (filter: { type: string; value: string }) => {
    if (filter.type === 'category') {
      categorySelected = categorySelected.filter((item) => item !== filter.value);
    }
    if (filter.type === 'series') {
      seriesSelected = seriesSelected.filter((item) => item !== filter.value);
    }
    if (filter.type === 'creators') {
      creatorsSelected = creatorsSelected.filter((item) => item !== filter.value);
    }
    if (filter.type === 'price') {
      sliderInfo = [0, 5000];
    }
  };
  const close = (): void => {
    dispatch('close');
  };

  const removeAllFilters = (): void => {
    categorySelected = [];
    seriesSelected = [];
    creatorsSelected = [];
    sliderInfo = [0, 5000];
  };

  export let categories: { id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];

  let startDate: string;
  let endDate: string;

  let sliderInfo: [number, number] = [0, 5000];

  let categorySelected = [];
  let seriesSelected = [];
  let creatorsSelected = [];
  $: priceSelected =
    sliderInfo[0] !== 0 || sliderInfo[1] !== 5000
      ? `$${sliderInfo[0]} to ${sliderInfo[1]}`
      : undefined;
</script>

<div class="flex flex-col text-gray-400 gap-8 md:gap-9">
  <div class="flex flex-col md:order-3 gap-4">
    <div class="flex items-center gap-2 text-5xl text-black md:text-2xl md:text-gray-400">
      <span class="flex-auto">Filter by</span>
      <Icon
        on:click={close}
        path={mdiWindowClose}
        size="1.66"
        class="bg-gray-200 rounded-2xl p-1 md:hidden"
      />
      {#if filters.length > 0}
        <div
          on:click={removeAllFilters}
          class="hidden gap-1 text-base text-black font-black italic cursor-pointer md:flex"
        >
          Clear All
          <Icon path={mdiWindowClose} size="0.8" class="self-center cursor-pointer" />
        </div>
      {/if}
    </div>
    <div class="flex flex-wrap gap-1">
      {#each filters as filter}
        <div class="flex font-black bg-black text-white italic rounded-xl px-2 py-1">
          <span>{filter.value}</span>
          <Icon
            path={mdiWindowClose}
            size="0.8"
            class="self-center cursor-pointer"
            on:click={() => removeFilter(filter)}
          />
        </div>
      {/each}
    </div>
  </div>
  <div class="flex flex-col md:order-1">
    {#each [{ label: 'All', status: '' }, { label: 'Released', status: 'released' }, { label: 'Upcoming', status: 'upcoming' }] as { label, status }}
      <div
        use:queryParameter={{ base: '/marketplace', params: { status, page: '' } }}
        class="flex gap-2 items-center py-3 cursor-pointer hover:text-gray-500 text-2xl"
        class:active={status ? $page.query.get('status') === status : !$page.query.get('status')}
      >
        <span class="label">{label}</span>
      </div>
    {/each}
  </div>
  <div class="w-10 border border-b-2 border-gray-300 md:order-2" />
  <div class="flex flex-col gap-4 md:order-4">
    <div
      class="lg:grid lg:grid-cols-3 flex flex-col justify-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      <div
        class="flex flex-1 items-center"
        use:datePicker={{
          maxDate: endDate,
          onChange: (selectedDates, dateString) => {
            startDate = dateString;
          },
        }}
      >
        <div class="whitespace-nowrap ">{startDate || 'Start Date'}</div>
        <Icon path={mdiChevronDown} color="black" />
      </div>
      <div
        class="w-4 flex-shrink justify-self-center border boder-b-2 border-gray-300 self-center"
      />
      <div
        class="flex flex-1 items-center justify-self-end"
        use:datePicker={{
          minDate: startDate,
          onChange: (selectedDates, dateString) => {
            endDate = dateString;
          },
        }}
      >
        <div class="whitespace-nowrap ">{endDate || 'End Date'}</div>
        <Icon path={mdiChevronDown} color="black" />
      </div>
    </div>
    <div
      class="grid grid-cols-2 items-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      <span>Price Range</span>
      <div class="flex flex-row ">
        <p class="text-sm font-bold text-black italic whitespace-nowrap">
          From ${sliderInfo[0]} to ${sliderInfo[1]}
        </p>
        <Icon path={mdiChevronDown} color="black" class="justify-self-end transform -rotate-90" />
      </div>
    </div>
    <RangeSlider min={0} max={5000} bind:values={sliderInfo} />
    <Accordion title={'Category'}>
      {#each categories as category (category.id)}
        <Checkbox bind:group={categorySelected} value={category.name}>
          <span class="font-black italic">{category.name}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion title={'Series'}>
      {#each series as serie}
        <Checkbox bind:group={seriesSelected} value={serie.name}>
          <span class="font-black italic">{serie.name}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion title={'Creators'}>
      {#each creators as creator}
        <Checkbox bind:group={creatorsSelected} value={creator.username}>
          <span class="font-black italic">{creator.username}</span>
        </Checkbox>
      {/each}
    </Accordion>
  </div>

  <div
    class="self-center w-full py-3 max-w-xl bg-black text-white text-2xl text-center rounded-3xl md:hidden"
  >
    Update Filters {filters.length > 0 ? `(${filters.length})` : ''}
  </div>
</div>

<style>
  .active {
    @apply cursor-default;
  }
  .active > .label {
    @apply text-black;
  }
  .active:hover {
    @apply text-gray-400;
  }
  .active:hover > .label {
    @apply text-black;
  }
</style>
