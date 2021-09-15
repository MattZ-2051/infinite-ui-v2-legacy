<script lang="ts">
  import { mdiChevronDown, mdiSortVariant } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { media } from '$lib/media-query.store';

  let dispatch = createEventDispatcher();

  export let sortOptions: { id: number; name: string; value: string; order: string }[];
  export let label = 'Sort by:';

  const getSelected = () => {
    if (!$page.query.get('sortBy')) {
      return sortOptions[0];
    }
    const [value, order] = $page.query.get('sortBy').split(':');
    return sortOptions.find((item) => item.value === value && item.order === order);
  };
  export let selected = getSelected();

  const select = (option: { id: number; value: string; order: string; name: string }): void => {
    selected = option;
    dispatch('select', { value: option.value, order: option.order });
  };
</script>

<Menu placement="bottom-end">
  <MenuTrigger slot="trigger" class="gap-2" data-testid="sort-container">
    <div class="flex-col items-end hidden lg:flex">
      <div class="text-gray-500 text-sm">{label}</div>
      <div class="whitespace-nowrap">
        {selected.name}
        <Icon class="inline" path={mdiChevronDown} />
      </div>
    </div>
    <div
      class="lg:hidden rounded-full"
      style="color: var(--sort-icon-color); background-color: var(--sort-icon-bg-color)"
    >
      <Icon path={mdiSortVariant} size="1.5" class="p-1 rounded-full" />
    </div>
  </MenuTrigger>

  <MenuList slot="menu">
    {#each sortOptions as option}
      {#if option.id !== selected.id || !$media.lg}
        <MenuItem on:select={() => select(option)} selected={option.id === selected.id}>
          {option.name}
        </MenuItem>
      {/if}
    {/each}
  </MenuList>
</Menu>
