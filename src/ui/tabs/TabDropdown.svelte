<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TabItem } from './types';
  import { mdiChevronDown } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';

  export let items: TabItem[] = [];
  export let showMenu = false;
  let trigger: HTMLElement;

  const dispatch = createEventDispatcher<{ activate: TabItem }>();
</script>

<button type="button" class="select-none" on:click={() => (showMenu = !showMenu)} bind:this={trigger} {...$$restProps}>
  <Icon color="var(--tab-active-color)" path={mdiChevronDown} />
</button>
{#if showMenu}
  <Menu {trigger} offset={4} position="bottom-end" on:close={() => (showMenu = false)}>
    {#each items as item (item.id)}
      <MenuItem
        class="text-base"
        on:click={() => {
          dispatch('activate', item);
          showMenu = false;
        }}
      >
        {item.title}
        {#if item.icon}
          <Icon path={item.icon} class="ml-2" />
        {/if}
      </MenuItem>
    {/each}
  </Menu>
{/if}
