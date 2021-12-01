<script lang="ts">
  import { mdiWindowClose } from '@mdi/js';
  import type { Profile, Edition, Series } from '$lib/sku-item/types';
  import type { FilterType } from './types';
  import { createEventDispatcher } from 'svelte';
  import type { ActiveType } from '$ui/accordion/AccordionGroup.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { Input } from '$lib/components/form';
  import Button from '$lib/components/Button.svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { RangeSlider } from '$ui/rangeslider';
  import { Checkbox } from '$ui/checkbox';
  import { formatDate, formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { queryParameter } from '$util/queryParameter';
  import Tag from '$ui/Tag/Tag.svelte';
  import routes from '$project/routes';
  import { ENABLE_ETH_CURRENCY } from '$project/variables';
  import { setFilters, modeFilters } from './marketplace.service';

  const dispatch = createEventDispatcher();
  const maxPriceDefault = 10_000;

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

  const onPriceRangeChange = (range: [string, string]) => {
    const [minPrice_, maxPrice_] = range;
    setFilters({
      params: {
        minPrice: +minPrice_ > 0 ? +minPrice_ : false,
        maxPrice: +maxPrice_ < maxPrice ? +maxPrice_ : false,
        page: 1,
      },
    });
  };

  const onMinPriceChange = (event) => {
    const tValue = (event.target as HTMLInputElement).value;
    const value = +tValue;
    if (value < 0 || value >= +priceRange[1]) {
      event.preventDefault();
      return;
    }
    priceRange = [tValue, priceRange[1]];
    onPriceRangeChange(priceRange);
  };

  const onMaxPriceChange = (event) => {
    const tValue = (event.target as HTMLInputElement).value;
    const value = +tValue;
    if (value <= +priceRange[0]) {
      event.preventDefault();
      return;
    }
    priceRange = [priceRange[0], tValue];
    onPriceRangeChange(priceRange);
  };

  function removeAllFilters() {
    setFilters({
      params: { mode: $page.query.get('mode') },
      reset: true,
    });
  }

  export let categories: { _id: string; name: string }[];
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

  const saleTypeFilters: { id: string; label: string }[] = [
    { id: 'auction', label: 'Auction' },
    { id: 'fixed', label: 'Buy Now' },
    { id: 'giveaway', label: 'Giveaway' },
  ];

  const nftTypeFilters: { id: string; label: string }[] = [
    { id: 'ETH', label: 'Ethereum (ERC721)' },
    { id: 'USD', label: 'Hedera (HTS)' },
  ];

  let priceRange: [string, string];

  function initSlider(min, max) {
    priceRange = [min, max];
  }
  $: initSlider($page.query.get('minPrice') || '0', $page.query.get('maxPrice') || `${maxPrice}`);

  function toggle(
    type: 'category' | 'typeEdition' | 'series' | 'issuerId' | 'saleType' | 'currency',
    id: string,
    event: Event
  ) {
    toggleCheckboxFilter(type, id, (event.target as HTMLInputElement).checked);
  }

  function toggleCheckboxFilter(
    type: 'category' | 'typeEdition' | 'series' | 'issuerId' | 'saleType' | 'currency',
    id: string,
    value: boolean
  ) {
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
  $: categorySelectedObject = categorySelected.map((id) => categories.find((c) => c._id === id)).filter(Boolean);
  $: availableCategorySelected = categorySelectedObject.map((c) => c._id);

  $: seriesSelected = $page.query.get('series') ? $page.query.get('series').split(',') : [];
  $: seriesSelectedObject = seriesSelected.map((id) => series.find((c) => c._id === id)).filter(Boolean);

  $: editionSelected = $page.query.get('typeEdition') ? $page.query.get('typeEdition').split(',') : [];
  $: editionSelectedObject = editionSelected.map((id) => editionFilters.find((c) => c.id === id)).filter(Boolean);

  $: saleTypeSelected = $page.query.get('saleType') ? $page.query.get('saleType').split(',') : [];
  $: saleTypeSelectedObject = saleTypeSelected.map((id) => saleTypeFilters.find((c) => c.id === id)).filter(Boolean);

  $: nftTypeSelected = $page.query.get('currency') ? $page.query.get('currency').split(',') : [];
  $: nftTypeSelectedObject = nftTypeSelected.map((id) => nftTypeFilters.find((c) => c.id === id)).filter(Boolean);
  $: availableNftTypeSelected = nftTypeSelectedObject.map((c) => c.id);

  $: creatorsSelected = $page.query.get('issuerId') ? $page.query.get('issuerId').split(',') : [];
  $: creatorsSelectedObject = creatorsSelected.map((_id) => creators.find((c) => c._id === _id)).filter(Boolean);
  $: availableCreatorsSelected = creatorsSelectedObject.map((c) => c._id);

  $: startDateSelected = $page.query.get('startDate');
  $: endDateSelected = $page.query.get('endDate');
  $: dateFilter = formatDateRange(startDateSelected, endDateSelected);

  $: priceSelectedObject =
    $page.query.has('minPrice') || $page.query.has('maxPrice')
      ? `${formatCurrencyWithOptionalFractionDigits(+$page.query.get('minPrice') || 0, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 18,
        })}-${formatCurrencyWithOptionalFractionDigits(+$page.query.get('maxPrice') || maxPrice, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 18,
        })}`
      : undefined;

  $: searchFilter = $page.query.get('search') || '';

  $: filters = <FilterType[]>[
    ...(searchFilter ? [{ type: 'search', label: searchFilter }] : []),
    ...categorySelectedObject.map((v) => ({ type: 'category', label: v.name, id: v._id })),
    ...editionSelectedObject.map((v) => ({ type: 'typeEdition', label: v.label, id: v.id })),
    ...saleTypeSelectedObject.map((v) => ({ type: 'saleType', label: v.label, id: v.id })),
    ...nftTypeSelectedObject.map((v) => ({ type: 'currency', label: v.label, id: v.id })),
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
        use:queryParameter={{
          base: routes.marketplace,
          params: {
            mode: status,
            page: '',
            category: '',
            typeEdition: '',
            series: '',
            issuerId: '',
            minPrice: '',
            maxPrice: '',
            startDate: '',
            endDate: '',
          },
        }}
        class="text-gray-500 hover:text-gray-400 flex gap-2 items-center py-3 cursor-pointer text-lg"
        class:active={status ? $page.query.get('mode') === status : !$page.query.get('mode')}
      >
        <span class="label">{label}</span>
      </div>
    {/each}
  </div>

  <AccordionGroup class="c-filter-accordion md:order-4" multiple bind:active>
    {#if creators.length}
      <Accordion
        id="talent"
        titleClass="py-4 px-6"
        class="c-filter-accordion border border-gray-200 -mb-px {active.includes('talent') ? 'expanded' : ''}"
      >
        <div slot="title" class="text-lg leading-8 text-left">
          Released by
          {#if availableCreatorsSelected.length}
            <span class="text-default text-xs align-top">({availableCreatorsSelected.length})</span>
          {/if}
        </div>
        {#each creators as creator}
          <Checkbox
            class="mb-2"
            value={creator._id}
            group={availableCreatorsSelected}
            on:change={(event) => toggle('issuerId', creator._id, event)}
            let:checked
          >
            <span>{creator.username}</span>
          </Checkbox>
        {/each}
      </Accordion>
    {/if}

    <Accordion
      id="price"
      titleClass="py-4 px-6"
      class="c-filter-accordion border border-gray-200 -mb-px {active.includes('price') ? 'expanded' : ''}"
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
        max={maxPrice || maxPriceDefault}
        on:stop={({ detail }) => onPriceRangeChange(detail)}
      />

      <div class="flex gap-6 mt-10">
        <Input
          type="number"
          label="From"
          value={priceRange[0]}
          on:input={onMinPriceChange}
          step="0.000000000000000001"
          min="0"
        />
        <Input
          type="number"
          label="To"
          value={priceRange[1]}
          on:input={onMaxPriceChange}
          step="0.000000000000000001"
          min="0"
        />
      </div>
    </Accordion>

    <Accordion
      id="typeEdition"
      titleClass="py-4 px-6"
      class="c-filter-accordion border border-gray-200 -mb-px {active.includes('typeEdition') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Edition Type
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
      id="saleType"
      titleClass="py-4 px-6"
      class="c-filter-accordion border border-gray-200 {active.includes('saleType') ? 'expanded' : ''}"
    >
      <div slot="title" class="text-lg leading-8 text-left">
        Sale Type {#if saleTypeSelected.length}
          <span class="text-default text-xs align-top">({saleTypeSelected.length})</span>
        {/if}
      </div>
      {#each saleTypeFilters as { id, label } (id)}
        <Checkbox
          class="mb-2"
          value={id}
          group={saleTypeSelected}
          on:change={(event) => toggle('saleType', id, event)}
          let:checked
        >
          <span>{label}</span>
        </Checkbox>
      {/each}
    </Accordion>
    {#if categories.length}
      <Accordion
        id="category"
        titleClass="py-4 px-6"
        class="c-filter-accordion border border-gray-200 {active.includes('category') ? 'expanded' : ''}"
      >
        <div slot="title" class="text-lg leading-8 text-left">
          Category {#if availableCategorySelected.length}
            <span class="text-default text-xs align-top">({availableCategorySelected.length})</span>
          {/if}
        </div>
        {#each categories as category (category._id)}
          <Checkbox
            class="mb-2"
            value={category._id}
            group={availableCategorySelected}
            on:change={(event) => toggle('category', category._id, event)}
            let:checked
          >
            <span>{category.name}</span>
          </Checkbox>
        {/each}
      </Accordion>
    {/if}
    {#if ENABLE_ETH_CURRENCY && nftTypeFilters.length > 0}
      <Accordion
        id="currency"
        titleClass="py-4 px-6"
        class="c-filter-accordion border border-gray-200 {active.includes('currency') ? 'expanded' : ''}"
      >
        <div slot="title" class="text-lg leading-8 text-left">
          NFT Type {#if availableNftTypeSelected.length}
            <span class="text-default text-xs align-top">({availableNftTypeSelected.length})</span>
          {/if}
        </div>
        {#each nftTypeFilters as { id, label } (id)}
          <Checkbox
            class="mb-2"
            value={id}
            group={availableNftTypeSelected}
            on:change={(event) => toggle('currency', id, event)}
            let:checked
          >
            <span>{label}</span>
          </Checkbox>
        {/each}
      </Accordion>
    {/if}
  </AccordionGroup>

  <Button variant="brand" on:click={close} class="self-center w-full py-3 text-2xl text-center md:hidden">
    {total > 0 ? `View Matching Results (${total})` : 'No Matching Results'}
  </Button>
</div>

<style lang="postcss">
  :global(.c-filter-accordion:first-child) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  :global(.c-filter-accordion:last-child) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  .active {
    @apply cursor-default;
  }
  .active > .label {
    color: var(--default-color);
  }
  .single-text {
    color: var(--edition-single-color);
  }
  .limited-text {
    color: var(--edition-limited-color);
  }
  .open-text {
    color: var(--edition-open-color);
  }
  :global(.expanded) {
    --accordion-title-color: var(--primary-color);
    --accordion-title-icon-color: var(--primary-color);
    @apply border-primary relative z-10;
  }
</style>
