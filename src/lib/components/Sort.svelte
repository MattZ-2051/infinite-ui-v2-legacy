<script lang="ts">
  import { mdiChevronDown, mdiSortVariant } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';
  import MenuVariantLight from '$ui/menu/variants/MenuVariantLight.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import MenuVariantDark from '$ui/menu/variants/MenuVariantDark.svelte';

  let dispatch = createEventDispatcher();

  let showSortMenu = false;
  let trigger: HTMLElement;
  export let sortOptions: { id: number; name: string; value: string; order: string }[];
  export let label = 'Sort by:';
  export let theme: 'light' | 'dark' = 'light';

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

<button
  type="button"
  class="flex cursor-pointer gap-2 text-gray-400 select-none"
  data-testid="sort-container"
  on:click={() => (showSortMenu = !showSortMenu)}
  bind:this={trigger}
>
  <span class="hidden lg:inline">{label}</span>
  <span class="hidden lg:inline {theme === 'light' ? 'text-black' : 'text-white'}">{selected.name}</span>
  <Icon path={mdiChevronDown} color="gray" class="mr-3 hidden lg:inline" />
  <Icon
    path={mdiSortVariant}
    size="1.5"
    color={theme === 'light' ? 'white' : 'black'}
    class="p-1 lg:hidden rounded-full {theme === 'light' ? 'bg-black' : 'bg-white'}"
  />
</button>

{#if showSortMenu}
  <svelte:component this={theme === 'light' ? MenuVariantLight : MenuVariantDark}>
    <Menu
      {trigger}
      offset={4}
      position="bottom-end"
      on:click={() => (showSortMenu = !showSortMenu)}
      on:close={() => (showSortMenu = false)}
    >
      {#each sortOptions as option}
        <div class={option.id === selected.id && 'lg:hidden'}>
          <MenuItem on:click={() => select(option)} active={option.id === selected.id}>
            {option.name}
          </MenuItem>
        </div>
      {/each}
    </Menu>
  </svelte:component>
{/if}
