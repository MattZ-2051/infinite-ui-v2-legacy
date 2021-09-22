<script lang="ts">
  import { mdiWindowClose } from '@mdi/js';
  import type { Profile, Edition, Series } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import type { ActiveType } from '$ui/accordion/AccordionGroup.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import Input from '$lib/components/Input.svelte';
  import Button from '$lib/components/Button.svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { RangeSlider } from '$ui/rangeslider';
  import { Checkbox } from '$ui/checkbox';
  import { formatDate, formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { queryParameter } from '$util/queryParameter';
  import Tag from '$ui/Tag/Tag.svelte';
  import routes from '$project/routes';
  import { setFilters, modeFilters } from './marketplace.service';

  const dispatch = createEventDispatcher();

  type FilterType = {
    type: 'category' | 'series' | 'issuerId' | 'price' | 'date' | 'search';
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

  const onPriceRangeChange = (range: [number, number]) => {
    const [minPrice_, maxPrice_] = range;
    setFilters({
      params: {
        minPrice: minPrice_ > 0 ? minPrice_ : false,
        maxPrice: maxPrice_ < maxPrice ? maxPrice_ : false,
        page: 1,
      },
    });
  };

  const onMinPriceChange = (event) => {
    onPriceRangeChange([event.target.value, priceRange[1]]);
  };

  const onMaxPriceChange = (event) => {
    onPriceRangeChange([priceRange[0], event.target.value]);
  };

  function removeAllFilters() {
    setFilters({
      params: { mode: $page.query.get('mode') },
      reset: true,
    });
  }

  export let categories: { id: string; name: string }[];
  export let creators: Profile[];
  export let series: Series[];
  export let maxPrice: number;
  export let total = 0;

  let active: ActiveType = [];

  const editionFilters: { id: Edition; label: string }[] = [
    { id: 'single', label: 'One-of-a-Kind' },
    { id: 'limited', label: 'Limited Edition' },
    { id: 'open', label: 'Open Edition' },
  ];

  let priceRange: [number, number];

  function initSlider(min, max) {
    priceRange = [min, max];
  }
  $: initSlider(+$page.query.get('minPrice') || 0, +$page.query.get('maxPrice') || maxPrice);

  function toggle(type: 'category' | 'typeEdition' | 'series' | 'issuerId', id: string, event: Event) {
    toggleCheckboxFilter(type, id, (event.target as HTMLInputElement).checked);
  }

  function toggleCheckboxFilter(type: 'category' | 'typeEdition' | 'series' | 'issuerId', id: string, value: boolean) {
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
      return `${dateStart} - ${dateEnd}`;
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

  $: editionSelected = $page.query.get('typeEdition') ? $page.query.get('typeEdition').split(',') : [];
  $: editionSelectedObject = editionSelected.map((id) => editionFilters.find((c) => c.id === id)).filter(Boolean);

  $: creatorsSelected = $page.query.get('issuerId') ? $page.query.get('issuerId').split(',') : [];
  $: creatorsSelectedObject = creatorsSelected.map((_id) => creators.find((c) => c._id === _id)).filter(Boolean);

  $: startDateSelected = $page.query.get('startDate');
  $: endDateSelected = $page.query.get('endDate');
  $: dateFilter = formatDateRange(startDateSelected, endDateSelected);

  $: priceSelectedObject =
    $page.query.has('minPrice') || $page.query.has('maxPrice')
      ? `${formatCurrencyWithOptionalFractionDigits(
          +$page.query.get('minPrice') || 0
        )}-${formatCurrencyWithOptionalFractionDigits(+$page.query.get('maxPrice') || maxPrice)}`
      : undefined;

  $: searchFilter = $page.query.get('search') || '';

  $: filters = <FilterType[]>[
    ...(searchFilter ? [{ type: 'search', label: searchFilter }] : []),
    ...categorySelectedObject.map((v) => ({ type: 'category', label: v.name, id: v.id })),
    ...editionSelectedObject.map((v) => ({ type: 'typeEdition', label: v.label, id: v.id })),
    ...seriesSelectedObject.map((v) => ({ type: 'series', label: v.name, id: v._id })),
    ...creatorsSelectedObject.map((v) => ({ type: 'issuerId', label: v.username, id: v._id })),
    ...(priceSelectedObject ? [{ type: 'price', label: priceSelectedObject }] : []),
    ...(dateFilter ? [{ type: 'date', label: dateFilter }] : []),
  ];
</script>

<div class="flex flex-col gap-7 md:gap-8">
  <div class="flex flex-col md:order-3">
    <div class="flex items-center gap-2 text-lg">
      <span class="flex-auto">Filter by</span>
      <button class="md:hidden" type="button" on:click={close}>
        <Icon path={mdiWindowClose} size="1.66" class="rounded-2xl p-1" />
      </button>
      {#if filters.length > 0}
        <div on:click={removeAllFilters} class="hidden gap-1 text-base cursor-pointer md:flex">
          Clear All
          <Icon path={mdiWindowClose} size="0.75" class="self-center cursor-pointer" />
        </div>
      {/if}
    </div>

    {#if filters.length > 0}
      <div class="flex flex-wrap gap-2 mt-4">
        {#each filters as filter}
          <Tag on:remove={() => removeFilter(filter)}>
            <span title={filter.label}>{filter.label}</span>
          </Tag>
        {/each}
      </div>
    {/if}
  </div>
  <div class="flex flex-col md:order-1">
    {#each modeFilters as { label, status }}
      <div
        use:queryParameter={{ base: routes.marketplace, params: { mode: status, page: '' } }}
        class="text-gray-500 hover:text-gray-400 flex gap-2 items-center py-3 cursor-pointer text-lg"
        class:active={status ? $page.query.get('mode') === status : !$page.query.get('mode')}
      >
        <span class="label">{label}</span>
      </div>
    {/each}
  </div>
  <AccordionGroup class="md:order-4" multiple bind:active>
    <Accordion
      id="talent"
      titleClass="py-4 px-6"
      class="border border-gray-200 rounded-t-lg -mb-px {active.includes('talent') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Talent
        {#if creatorsSelected.length}
          <span class="text-default text-xs align-top">({creatorsSelected.length})</span>
        {/if}
      </div>
      {#each creators as creator}
        <Checkbox
          class="mb-2"
          value={creator._id}
          group={creatorsSelected}
          on:change={(event) => toggle('issuerId', creator._id, event)}
          let:checked
        >
          <span>{creator.username}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion
      id="price"
      titleClass="py-4 px-6"
      class="border border-gray-200 -mb-px {active.includes('price') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Price Range
        {#if priceSelectedObject}
          <span class="text-default text-xs align-top">({priceSelectedObject})</span>
        {/if}
      </div>

      <RangeSlider
        bind:values={priceRange}
        format={formatCurrencyWithOptionalFractionDigits}
        min={0}
        max={maxPrice}
        on:stop={({ detail }) => onPriceRangeChange(detail)}
      />

      <div class="flex gap-6 mt-10">
        <Input label="From" let:klass let:id>
          <input type="number" {id} class={klass} bind:value={priceRange[0]} on:input={onMinPriceChange} />
        </Input>

        <Input label="To" let:klass let:id>
          <input type="number" {id} class={klass} bind:value={priceRange[1]} on:input={onMaxPriceChange} />
        </Input>
      </div>
    </Accordion>
    <Accordion
      id="typeEdition"
      titleClass="py-4 px-6"
      class="border border-gray-200 -mb-px {active.includes('typeEdition') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Edition
        {#if editionSelected.length}
          <span class="text-default text-xs align-top">({editionSelected.length})</span>
        {/if}
      </div>
      {#each editionFilters as { id, label } (id)}
        <Checkbox
          class="mb-2"
          value={id}
          group={editionSelected}
          on:change={(event) => toggle('typeEdition', id, event)}
          let:checked
        >
          <span class="{id}-text font-medium">{label}</span>
        </Checkbox>
      {/each}
    </Accordion>
    <Accordion
      id="category"
      titleClass="py-4 px-6"
      class="border border-gray-200 rounded-b-lg {active.includes('category') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Category {#if categorySelected.length}
          <span class="text-default text-xs align-top">({categorySelected.length})</span>
        {/if}
      </div>
      {#each categories as category (category.id)}
        <Checkbox
          class="mb-2"
          value={category.id}
          group={categorySelected}
          on:change={(event) => toggle('category', category.id, event)}
          let:checked
        >
          <span>{category.name}</span>
        </Checkbox>
      {/each}
    </Accordion>
  </AccordionGroup>

  <Button on:click={close} class="self-center w-full py-3 text-2xl text-center md:hidden">
    {total > 0 ? `View Matching Results (${total})` : 'No Matching Results'}
  </Button>
</div>

<style lang="postcss">
  .active {
    @apply cursor-default;
  }
  .active > .label {
    color: var(--color);
  }
  .single-text {
    color: var(--edition-single);
  }
  .limited-text {
    color: var(--edition-limited);
  }
  .open-text {
    color: var(--edition-open);
  }
  :global(.expanded) {
    --accordion-title-color: var(--filters-color-expanded);
    --accordion-title-icon-color: var(--filters-color-expanded);
    @apply border-primary relative z-10;
  }
</style>
