<script lang="ts">
  import type { Profile, Edition, Series } from '$lib/sku-item/types';
  import type { FilterType } from './types';
  import { createEventDispatcher } from 'svelte';
  import type { ActiveType } from '$ui/accordion/AccordionGroup.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import Button from '$lib/components/Button.svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { RangeSlider } from '$ui/rangeslider';
  import { formatDate, formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { queryParameter } from '$util/queryParameter';
  import Tag from '$ui/Tag/Tag.svelte';
  import routes from '$project/routes';
  import mdiWindowClose from '$lib/components/icons/window-close';
  import { ENABLE_ETH_CURRENCY } from '$project/variables';
  import { setFilters, modeFilters } from './marketplace.service';
  import AccordionCheckBox from './accordion-types/AccordionCheckBox.svelte';

  const dispatch = createEventDispatcher();

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
        minPrice: +minPrice_ > 0 ? minPrice_ : false,
        maxPrice: +maxPrice_ < maxPrice ? maxPrice_ : false,
        page: 1,
      },
    });
  };

  function removeAllFilters() {
    setFilters({
      params: { mode: $page.url.searchParams.get('mode') },
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

  // let priceRange: [string, string];

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

  $: categorySelected = $page.url.searchParams.get('category') ? $page.url.searchParams.get('category').split(',') : [];
  $: categorySelectedObject = categorySelected.map((id) => categories.find((c) => c._id === id)).filter(Boolean);
  $: availableCategorySelected = categorySelectedObject.map((c) => c._id);

  $: seriesSelected = $page.url.searchParams.get('series') ? $page.url.searchParams.get('series').split(',') : [];
  $: seriesSelectedObject = seriesSelected.map((id) => series.find((c) => c._id === id)).filter(Boolean);

  $: editionSelected = $page.url.searchParams.get('typeEdition')
    ? $page.url.searchParams.get('typeEdition').split(',')
    : [];
  $: editionSelectedObject = editionSelected.map((id) => editionFilters.find((c) => c.id === id)).filter(Boolean);

  $: saleTypeSelected = $page.url.searchParams.get('saleType') ? $page.url.searchParams.get('saleType').split(',') : [];
  $: saleTypeSelectedObject = saleTypeSelected.map((id) => saleTypeFilters.find((c) => c.id === id)).filter(Boolean);

  $: nftTypeSelected = $page.url.searchParams.get('currency') ? $page.url.searchParams.get('currency').split(',') : [];
  $: nftTypeSelectedObject = nftTypeSelected.map((id) => nftTypeFilters.find((c) => c.id === id)).filter(Boolean);
  $: availableNftTypeSelected = nftTypeSelectedObject.map((c) => c.id);

  $: creatorsSelected = $page.url.searchParams.get('issuerId') ? $page.url.searchParams.get('issuerId').split(',') : [];
  $: creatorsSelectedObject = creatorsSelected.map((_id) => creators.find((c) => c._id === _id)).filter(Boolean);
  $: availableCreatorsSelected = creatorsSelectedObject.map((c) => c._id);

  $: startDateSelected = $page.url.searchParams.get('startDate');
  $: endDateSelected = $page.url.searchParams.get('endDate');
  $: dateFilter = formatDateRange(startDateSelected, endDateSelected);

  $: priceSelectedObject =
    $page.url.searchParams.has('minPrice') || $page.url.searchParams.has('maxPrice')
      ? `${formatCurrencyWithOptionalFractionDigits(+$page.url.searchParams.get('minPrice') || 0, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 18,
        })}-${formatCurrencyWithOptionalFractionDigits(+$page.url.searchParams.get('maxPrice') || maxPrice, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 18,
        })}`
      : undefined;

  $: searchFilter = $page.url.searchParams.get('search') || '';

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
  <div class="flex flex-col order-2">
    <div class="flex items-center gap-2 text-lg">
      <span class="flex-auto">Filter by</span>
      {#if filters.length > 0}
        <div on:click={removeAllFilters} class="gap-1 text-base cursor-pointer flex">
          Clear All
          <Icon path={mdiWindowClose} size="var(--filter-icon-size, 1.1rem)" class="self-center cursor-pointer ml-2" />
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
  <div class="flex flex-col order-1">
    <div class="flex items-center gap-2 text-lg md:hidden">
      <span class="flex-auto text-2xl">Filters</span>
      <button type="button" on:click={close}>
        <Icon path={mdiWindowClose} size="1.66" class="rounded-2xl p-1" />
      </button>
    </div>
    <div class="mt-1">
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
          class="text-gray-500 hover:text-gray-400 flex gap-2 items-center py-1 cursor-pointer text-lg"
          class:active={status ? $page.url.searchParams.get('mode') === status : !$page.url.searchParams.get('mode')}
        >
          <span class="label">{label}</span>
        </div>
      {/each}
    </div>
  </div>

  <AccordionGroup class="c-filter-accordion order-3 " multiple bind:active>
    {#if creators.length}
      <AccordionCheckBox
        id="talent"
        title="Released by"
        {active}
        selectedGroup={availableCreatorsSelected}
        options={creators}
        {toggleCheckboxFilter}
        toggleId="issuerId"
        valueAtrName="_id"
        labelAtrName="username"
      />
    {/if}

    {#if maxPrice > 0}
      <Accordion
        id="price"
        titleClass="py-4 px-6"
        class="c-filter-accordion accordion-option border border-gray-200 -mb-px {active.includes('price')
          ? 'expanded'
          : ''}"
      >
        <div slot="title" class="text-lg leading-8 text-left">
          Price Range
          {#if priceSelectedObject}
            <span class="text-default text-xs align-top">({priceSelectedObject})</span>
          {/if}
        </div>

        <RangeSlider
          values={[
            $page.url.searchParams.get('minPrice') || '0',
            $page.url.searchParams.get('maxPrice') || `${maxPrice}`,
          ]}
          format={formatCurrencyWithOptionalFractionDigits}
          min={0}
          max={maxPrice}
          on:stop={({ detail }) => onPriceRangeChange(detail)}
        />
      </Accordion>
    {/if}

    <AccordionCheckBox
      id="typeEdition"
      title="Edition type"
      {active}
      selectedGroup={editionSelected}
      options={editionFilters}
      {toggleCheckboxFilter}
      valueAtrName="id"
      labelAtrName="label"
    />

    <AccordionCheckBox
      id="saleType"
      title="Sale Type"
      {active}
      selectedGroup={saleTypeSelected}
      options={saleTypeFilters}
      {toggleCheckboxFilter}
      valueAtrName="id"
      labelAtrName="label"
    />

    {#if categories.length}
      <AccordionCheckBox
        id="category"
        title="Category"
        {active}
        selectedGroup={availableCategorySelected}
        options={categories}
        {toggleCheckboxFilter}
        valueAtrName="_id"
        labelAtrName="name"
      />
    {/if}
    {#if ENABLE_ETH_CURRENCY && nftTypeFilters.length > 0}
      <AccordionCheckBox
        id="currency"
        title="NFT Type"
        {active}
        selectedGroup={availableNftTypeSelected}
        options={nftTypeFilters}
        {toggleCheckboxFilter}
        valueAtrName="id"
        labelAtrName="label"
      />
    {/if}
  </AccordionGroup>

  <Button
    variant="brand"
    on:click={close}
    class="self-center w-full py-3 text-center md:hidden order-4"
    style="font-size:var(--filter-button-font-size, 24px)"
  >
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
  :global(.accordion-option) {
    @apply relative z-10;
  }
  :global(.accordion-option:hover::after) {
    position: absolute;
    top: var(--market-border-hover-width);
    bottom: var(--market-border-hover-width);
    left: var(--market-border-hover-width);
    right: var(--market-border-hover-width);
    content: '';
    z-index: -2;
    background: var(--market-border-hover-color, none transparent);
  }

  :global(.accordion-option:hover::before) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: '';
    z-index: -1;
    background: var(--market-filter-option-hover-bg-color, none var(--bg-color));
  }

  :global(.accordion-option:first-child:hover::after, .accordion-option:first-child:hover::before) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  :global(.accordion-option:last-child:hover::after, .accordion-option:last-child:hover::before) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .active {
    @apply cursor-default;
  }
  .active > .label {
    color: var(--default-color);
  }

  :global(.expanded) {
    --accordion-title-color: var(--primary-color);
    --accordion-title-icon-color: var(--primary-color);
    border-color: var(--market-active-filter-color, --primary-color);
    @apply relative z-10;
  }
</style>
