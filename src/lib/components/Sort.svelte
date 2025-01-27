<script lang="ts">
  import { mdiSortVariant } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import type { SortOption } from '$lib/sku-item/types';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { media } from '$lib/media-query.store';
  import mdiChevronDown from '$lib/components/icons/arrow-down';
  import mdiChevronUp from '$lib/components/icons/arrow-up';
  import mdiTuneVariant from '$lib/components/icons/tune-variant';

  let dispatch = createEventDispatcher();

  export let sortOptions: SortOption[];
  export let label = 'Sort by:';
  export let key = 'sortBy';
  export let iconType = 'sort';

  $: selected = (() => {
    const value = $page.url.searchParams.get(key);
    if (!value) {
      return sortOptions[0];
    }
    return sortOptions.find((item) => item.value === value) || sortOptions[0];
  })();

  const select = (option: SortOption): void => {
    dispatch('select', { value: option.value, key });
  };
</script>

<Menu placement="bottom-end">
  <svelte:fragment slot="trigger">
    <MenuTrigger class="gap-2" data-testid="sort-container" aria-label={label} let:visible>
      <div class="flex-col items-end hidden lg:flex">
        <div class="text-gray-500 text-sm whitespace-nowrap">{label}</div>
        <div class="whitespace-nowrap">
          {selected.name}
          <Icon class="inline" path={visible ? mdiChevronUp : mdiChevronDown} />
        </div>
      </div>
      <div class="lg:hidden rounded-full bg-default text-inverse">
        {#if iconType === 'sort'}
          <Icon path={mdiSortVariant} size="1.5" class="p-1 rounded-full" />
        {:else}
          <Icon path={mdiTuneVariant} size="1.5" class="p-1 rounded-full" />
        {/if}
      </div>
    </MenuTrigger>
  </svelte:fragment>

  <MenuList slot="menu">
    {#each sortOptions as option (option.value)}
      {#if option.value !== selected.value || !$media.lg}
        <MenuItem on:select={() => select(option)} selected={option.value === selected.value}>
          {option.name}
        </MenuItem>
      {/if}
    {/each}
  </MenuList>
</Menu>
