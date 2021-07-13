<script lang="ts">
  import { mdiChevronDown } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';
  import MenuVariantLight from '$ui/menu/variants/MenuVariantLight.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';

  let dispatch = createEventDispatcher();

  let showSortMenu = false;
  let trigger: HTMLElement;
  let options = [
    {
      id: 1,
      name: 'Newest',
      order: 'desc',
      value: 'createdAt',
    },
    {
      id: 2,
      name: 'Oldest',
      order: 'asc',
      value: 'createdAt',
    },
  ];
  const getSelected = () => {
    if (!$page.query.get('sortBy')) {
      return options[0];
    }
    const [value, order] = $page.query.get('sortBy').split(':');
    return options.find((item) => item.value === value && item.order === order);
  };

  let selected = getSelected();
  $: availableOptions = options.filter((item) => item.id !== selected.id);

  const select = (option: { id: number; value: string; order: string; name: string }): void => {
    selected = option;
    dispatch('select', { value: option.value, order: option.order });
  };
</script>

<div
  class="flex cursor-pointer gap-2 text-gray-400 text-lg"
  on:click={() => (showSortMenu = !showSortMenu)}
  bind:this={trigger}
>
  <span>Sort by:</span>
  <span class="text-black">{selected.name}</span>
  <Icon path={mdiChevronDown} color="gray" class="mr-3" />
</div>

{#if showSortMenu}
  <MenuVariantLight>
    <Menu
      {trigger}
      offset={4}
      position="bottom-end"
      on:click={() => (showSortMenu = !showSortMenu)}
      on:close={() => (showSortMenu = false)}
    >
      {#each availableOptions as option}
        <MenuItem on:click={() => select(option)}>
          {option.name}
        </MenuItem>
      {/each}
    </Menu>
  </MenuVariantLight>
{/if}
