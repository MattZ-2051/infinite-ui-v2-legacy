<script context="module" lang="ts">
  export type SortOption = {
    name: string;
    value: string;
  };
</script>

<script lang="ts">
  import { mdiChevronDown, mdiSortVariant } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { media } from '$lib/media-query.store';

  let dispatch = createEventDispatcher();

  export let sortOptions: SortOption[];
  export let label = 'Sort by:';
  export let key = 'sortBy';

  const getSelected = () => {
    const value = $page.query.get(key);
    if (!value) {
      return sortOptions[0];
    }
    return sortOptions.find((item) => item.value === value) || sortOptions[0];
  };
  let selected = getSelected();

  const select = (option: SortOption): void => {
    selected = option;
    dispatch('select', { value: option.value, key });
  };
</script>

<Menu placement="bottom-end">
  <MenuTrigger slot="trigger" class="gap-2" data-testid="sort-container" aria-label={label}>
    <div class="flex-col items-end hidden lg:flex">
      <div class="text-gray-500 text-sm whitespace-nowrap">{label}</div>
      <div class="whitespace-nowrap">
        {selected.name}
        <Icon class="inline" path={mdiChevronDown} />
      </div>
    </div>
    <div class="lg:hidden rounded-full bg-default text-inverse">
      <Icon path={mdiSortVariant} size="1.5" class="p-1 rounded-full" />
    </div>
  </MenuTrigger>

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
