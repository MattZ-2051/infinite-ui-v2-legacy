<script lang="ts">
  import { mdiChevronDown, mdiSortVariant } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';

  let dispatch = createEventDispatcher();

  let showSortMenu = false;
  let trigger: HTMLElement;
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

<button
  type="button"
  class="flex cursor-pointer gap-2 text-gray-400 select-none"
  data-testid="sort-container"
  on:click={() => (showSortMenu = !showSortMenu)}
  bind:this={trigger}
>
  <span class="hidden lg:inline">{label}</span>
  <span class="hidden lg:inline" style="color: var(--sort-color)">{selected.name}</span>
  <Icon path={mdiChevronDown} color="gray" class="mr-3 hidden lg:inline" />
  <div
    class="lg:hidden rounded-full"
    style="color: var(--sort-icon-color); background-color: var(--sort-icon-bg-color)"
  >
    <Icon path={mdiSortVariant} size="1.5" class="p-1 rounded-full" />
  </div>
</button>

{#if showSortMenu}
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
{/if}
