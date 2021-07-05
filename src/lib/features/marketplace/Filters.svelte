<script lang="ts">
  import type { Profile, Rarity, Series } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import { mdiChevronDown, mdiWindowClose } from '@mdi/js';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { RangeSlider } from '$ui/rangeslider';
  import { datePicker } from '$ui/datepicker/datepicker';
  import { Checkbox } from '$ui/checkbox';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { formatDate, formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { queryParameter } from '$util/queryParameter';
  import { setFilters, statusFilters } from './marketplace.service';

  const dispatch = createEventDispatcher();

  type FilterType = {
    type: 'category' | 'series' | 'creators' | 'price' | 'date' | 'search';
    label: string;
    id: string;
  };

  const removeFilter = (filter: FilterType) => {
    // eslint-disable-next-line unicorn/prefer-switch
    if (filter.type === 'price') {
      setFilters({
        params: { minPrice: false, maxPrice: false, page: 1 },
      });
    } else if (filter.type === 'date') {
      setFilters({
        params: { startDate: false, endDate: false, page: 1 },
      });
    } else if (filter.type === 'search') {
      setFilters({
        params: { search: '', page: 1 },
      });
    } else {
      toggleCheckboxFilter(filter.type, filter.id, false);
    }
  };
  const close = (): void => {
    dispatch('close');
  };

  const onPriceRangeChange = (event: { detail: [number, number] }) => {
    const [minPrice_, maxPrice_] = event.detail;
    setFilters({
      params: {
        minPrice: minPrice_ > 0 ? minPrice_ : false,
        maxPrice: maxPrice_ < maxPrice ? maxPrice_ : false,
        page: 1,
      },
    });
  };

  function removeAllFilters() {
    setFilters({
      params: { page: 1, status: $page.query.get('status') },
      reset: true,
    });
  }

  export let categories: { id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
  export let maxPrice = 10_000;
  export let total = 0;

  const rarityFilters: { id: Rarity; label: string }[] = [
    { id: 'legendary', label: 'Legendary' },
    { id: 'epic', label: 'Epic' },
    { id: 'rare', label: 'Rare' },
    { id: 'uncommon', label: 'Uncommon' },
  ];

  let sliderInfo: [number, number];

  function initSlider(min, max) {
    sliderInfo = [min, max];
  }
  $: initSlider(+$page.query.get('minPrice') || 0, +$page.query.get('maxPrice') || maxPrice);

  function toggle(type: 'category' | 'rarity' | 'series' | 'creators', id: string, event: Event) {
    toggleCheckboxFilter(type, id, (event.target as HTMLInputElement).checked);
  }

  function toggleDate(type: 'start' | 'end', value: string) {
    setFilters({
      params: { [`${type}Date`]: value, page: 1 },
    });
  }

  function toggleCheckboxFilter(type: 'category' | 'rarity' | 'series' | 'creators', id: string, value: boolean) {
    setFilters({
      params: { [`${type}:${id}`]: value, page: 1 },
    });
  }

  function _formatDate(date: string, format = 'M/DD'): string {
    return date ? formatDate(date, format) : undefined;
  }

  function formatDateRange(dateStart, dateEnd) {
    dateStart = _formatDate(dateStart);
    dateEnd = _formatDate(dateEnd);
    if (dateStart && dateEnd) {
      return `${dateStart} to ${dateEnd}`;
    } else if (dateStart) {
      return `from ${dateStart}`;
    } else if (dateEnd) {
      return `until ${dateEnd}`;
    }
  }

  $: categorySelected = $page.query.get('category') ? $page.query.get('category').split(',') : [];
  $: categorySelectedObject = categorySelected.map((id) => categories.find((c) => c.id === id)).filter(Boolean);

  $: seriesSelected = $page.query.get('series') ? $page.query.get('series').split(',') : [];
  $: seriesSelectedObject = seriesSelected.map((id) => series.find((c) => c._id === id)).filter(Boolean);

  $: raritySelected = $page.query.get('rarity') ? $page.query.get('rarity').split(',') : [];
  $: raritySelectedObject = raritySelected.map((id) => rarityFilters.find((c) => c.id === id)).filter(Boolean);

  $: creatorsSelected = $page.query.get('creators') ? $page.query.get('creators').split(',') : [];
  $: creatorsSelectedObject = creatorsSelected
    .map((username) => creators.find((c) => c.username === username))
    .filter(Boolean);

  $: startDateSelected = $page.query.get('startDate');
  $: endDateSelected = $page.query.get('endDate');
  $: dateFilter = formatDateRange(startDateSelected, endDateSelected);

  $: priceSelectedObject =
    $page.query.has('minPrice') || $page.query.has('maxPrice')
      ? `${formatCurrencyWithOptionalFractionDigits(
          +$page.query.get('minPrice') || 0
        )} to ${formatCurrencyWithOptionalFractionDigits(+$page.query.get('maxPrice') || maxPrice)}`
      : undefined;

  $: searchFilter = $page.query.get('search') || '';

  $: filters = <FilterType[]>[
    ...(searchFilter ? [{ type: 'search', label: searchFilter }] : []),
    ...categorySelectedObject.map((v) => ({ type: 'category', label: v.name, id: v.id })),
    ...raritySelectedObject.map((v) => ({ type: 'rarity', label: v.label, id: v.id })),
    ...seriesSelectedObject.map((v) => ({ type: 'series', label: v.name, id: v._id })),
    ...creatorsSelectedObject.map((v) => ({ type: 'creators', label: v.username, id: v.username })),
    ...(priceSelectedObject ? [{ type: 'price', label: priceSelectedObject }] : []),
    ...(dateFilter ? [{ type: 'date', label: dateFilter }] : []),
  ];
</script>

<div class="flex flex-col text-gray-400 gap-8 md:gap-9">
  <div class="flex flex-col md:order-3 gap-4">
    <div class="flex items-center gap-2 text-5xl text-black md:text-2xl md:text-gray-400">
      <span class="flex-auto">Filter by</span>
      <Icon on:click={close} path={mdiWindowClose} size="1.66" class="bg-gray-200 rounded-2xl p-1 md:hidden" />
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
          <span>{filter.label}</span>
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
    {#each statusFilters as { label, status }}
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
    <div class="flex justify-around text-xl  md:text-lg">
      <div
        class="flex items-center px-2 py-3 hover:bg-gray-300 hover:text-black"
        use:datePicker={{
          maxDate: endDateSelected,
          disableMobile: true,
          onChange: (selectedDates, dateString) => toggleDate('start', dateString),
        }}
      >
        <div class="whitespace-nowrap ">{_formatDate(startDateSelected, 'MM/DD/YY') || 'Start Date'}</div>
        <Icon path={mdiChevronDown} color="black" />
      </div>
      <div class="w-4 flex-shrink border boder-b-2 border-gray-300 self-center" />
      <div
        class="flex items-center px-2 py-3 hover:bg-gray-300 hover:text-black"
        use:datePicker={{
          minDate: startDateSelected,
          disableMobile: true,
          onChange: (selectedDates, dateString) => toggleDate('end', dateString),
        }}
      >
        <div class="whitespace-nowrap ">{_formatDate(endDateSelected, 'MM/DD/YY') || 'End Date'}</div>
        <Icon path={mdiChevronDown} color="black" />
      </div>
    </div>
    <Accordion class="flex-grow">
      <div slot="title" class="flex flex-wrap gap-1 justify-between items-center ">
        <span class="text-2xl">Price Range</span>
        {#if $page.query.has('minPrice') || $page.query.has('maxPrice')}
          <div class="flex">
            <p class="text-xs font-bold text-black italic whitespace-nowrap">
              From {formatCurrencyWithOptionalFractionDigits(sliderInfo[0])} to {formatCurrencyWithOptionalFractionDigits(
                sliderInfo[1]
              )}
            </p>
          </div>
        {/if}
      </div>
      <RangeSlider
        bind:values={sliderInfo}
        format={formatCurrencyWithOptionalFractionDigits}
        min={0}
        max={maxPrice}
        on:stop={onPriceRangeChange}
      />
    </Accordion>
    <Accordion title={'Category'}>
      {#each categories as category (category.id)}
        <Checkbox
          value={category.id}
          group={categorySelected}
          on:change={(event) => toggle('category', category.id, event)}
          let:checked
        >
          <span class="font-black italic" class:text-black={checked}>{category.name}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion title={'Rarity'}>
      {#each rarityFilters as { id, label } (id)}
        <Checkbox value={id} group={raritySelected} on:change={(event) => toggle('rarity', id, event)} let:checked>
          <span class="font-black italic" class:text-black={checked}>{label}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion title={'Series'}>
      {#each series as serie}
        <Checkbox
          value={serie._id}
          group={seriesSelected}
          on:change={(event) => toggle('series', serie._id, event)}
          let:checked
        >
          <span class="font-black italic" class:text-black={checked}>{serie.name}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion title={'Creators'}>
      {#each creators as creator}
        <Checkbox
          value={creator.username}
          group={creatorsSelected}
          on:change={(event) => toggle('creators', creator.username, event)}
          let:checked
        >
          <span class="font-black italic" class:text-black={checked}>{creator.username}</span>
        </Checkbox>
      {/each}
    </Accordion>
  </div>

  <button
    type="button"
    on:click={close}
    class="self-center w-full py-3 max-w-xl bg-black text-white text-2xl text-center rounded-3xl md:hidden"
  >
    {total > 0 ? `View Matching Results (${total})` : 'No Matching Results'}
  </button>
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
