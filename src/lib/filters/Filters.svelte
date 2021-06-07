<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { mdiChevronDown } from '@mdi/js';
  import { mdiWindowClose } from '@mdi/js';

  const dispatch = createEventDispatcher();

  let nrOfItems = 12244;
  let nrOfReleased = 75;
  let nrOfUpcoming: number | undefined;
  let nrOfSoldOut: number | undefined;
  let active = 'All';
  let filters = ['Art', 'Sports', '4/20 to 5/26', 'test', 'adf asdfasd', 'asdfsad'];

  const removeFilter = (filter) => {
    filters = filters.filter((item) => item !== filter);
  };

  const close = (): void => {
    dispatch('close');
  };

  const removeAllFilters = (): void => {
    filters = [];
  };

  export let categories: { id: string; name: string }[];
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
      <div
        on:click={removeAllFilters}
        class="hidden gap-1 text-base text-black font-black italic cursor-pointer md:flex"
      >
        Clear All
        <Icon path={mdiWindowClose} size="0.8" class="self-center cursor-pointer" />
      </div>
    </div>
    <div class="flex flex-wrap gap-1">
      {#each filters as filter}
        <div class="flex font-black bg-black text-white italic rounded-xl px-2 py-1">
          <span>{filter}</span>
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
    <div
      on:click={() => (active = 'All')}
      class="flex gap-2 items-center py-3 cursor-pointer hover:text-gray-500"
      class:active={active === 'All'}
    >
      <span class="label text-2xl">All</span>
      {#if nrOfItems}
        <span class="italic font-black">({nrOfItems})</span>
      {/if}
    </div>
    <div
      on:click={() => (active = 'Released')}
      class="flex gap-2 items-center py-3 cursor-pointer hover:text-gray-500"
      class:active={active === 'Released'}
    >
      <span class="label text-2xl">Released</span>
      {#if nrOfReleased}
        <span class="italic font-black">({nrOfReleased})</span>
      {/if}
    </div>
    <div
      on:click={() => (active = 'Upcoming')}
      class="flex gap-2 items-center py-3 cursor-pointer hover:text-gray-500"
      class:active={active === 'Upcoming'}
    >
      <span class="label text-2xl">Upcoming</span>
      {#if nrOfUpcoming}
        <span class="italic font-black">({nrOfUpcoming})</span>
      {/if}
    </div>
    <div
      on:click={() => (active = 'Sold Out')}
      class="flex gap-2 items-center py-3 cursor-pointer hover:text-gray-500"
      class:active={active === 'Sold Out'}
    >
      <span class="label text-2xl">Sold Out</span>
      {#if nrOfSoldOut}
        <span class="italic font-black">({nrOfSoldOut})</span>
      {/if}
    </div>
  </div>
  <div class="w-10 border border-b-2 border-gray-300 md:order-2" />
  <div class="flex flex-col md:order-4">
    <div
      class="grid grid-cols-3 px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      <div class="flex flex-1 items-center">
        Start Date
        <Icon path={mdiChevronDown} color="black" />
      </div>
      <div
        class="w-4 flex-shrink justify-self-center border boder-b-2 border-gray-300 self-center"
      />
      <div class="flex flex-1 items-center justify-self-end">
        End Date
        <Icon path={mdiChevronDown} color="black" />
      </div>
    </div>
    <div
      class="grid grid-cols-2 items-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      Price Range
      <Icon path={mdiChevronDown} color="black" class="justify-self-end" />
    </div>
    <div
      class="grid grid-cols-2 items-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      Category
      <Icon path={mdiChevronDown} color="black" class="justify-self-end" />
    </div>
    <div class="flex flex-col px-3 gap-2 italic font-semibold">
      {#each categories as category (category.id)}
        <div class="flex items-center gap-2">
          <div class="rounded-full h-4 w-4 bg-gray-300" />
          {category.name}
        </div>
      {/each}
    </div>
    <div
      class="grid grid-cols-2 items-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      Brand
      <Icon path={mdiChevronDown} color="black" class="justify-self-end" />
    </div>
    <div
      class="grid grid-cols-2 items-center px-3 py-4 rounded-3xl text-xl hover:bg-gray-300 hover:text-black md:text-lg"
    >
      Series
      <Icon path={mdiChevronDown} color="black" class="justify-self-end" />
    </div>
  </div>
  <div
    class="self-center w-full py-3 max-w-xl bg-black text-white text-2xl text-center rounded-3xl md:hidden"
  >
    Update Filters {filters.length ? `(${filters.length})` : ''}
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
