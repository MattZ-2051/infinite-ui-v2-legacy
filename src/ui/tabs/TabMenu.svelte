<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TabItem } from './types';
  import { mdiChevronDown } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';

  export let items: TabItem[] = [];
  export let triggerClass = '';

  const dispatch = createEventDispatcher<{ activate: TabItem }>();
</script>

<Menu placement="bottom-end">
  <MenuTrigger slot="trigger" class={triggerClass}
    ><Icon path={mdiChevronDown} color="var(--tab-color-active, var(--default-color))" /></MenuTrigger
  >
  <MenuList slot="menu">
    {#each items as item (item.id)}
      <MenuItem class="text-base" on:select={() => dispatch('activate', item)}>
        {item.title}
        {#if item.icon}
          <Icon path={item.icon} class="ml-2" />
        {/if}
      </MenuItem>
    {/each}
  </MenuList>
</Menu>
