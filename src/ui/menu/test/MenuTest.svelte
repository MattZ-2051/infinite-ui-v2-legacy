<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Menu from '../Menu.svelte';
  import MenuList from '../MenuList.svelte';
  import MenuItem from '../MenuItem.svelte';
  import MenuTrigger from '../MenuTrigger.svelte';

  export let selected: string = undefined;
  export let disabled: string = undefined;

  const items = [
    {
      id: 'action-1',
      label: 'Action 1',
    },
    {
      id: 'action-2',
      label: 'Action 2',
    },
    {
      id: 'action-3',
      label: 'Action 3',
    },
  ];

  const dispatch = createEventDispatcher<{ select: string }>();
</script>

<Menu {...$$restProps}>
  <MenuTrigger slot="trigger">Menu Button</MenuTrigger>
  <MenuList slot="menu">
    {#each items as { id, label }}
      <MenuItem selected={selected === id} disabled={disabled === id} on:select={() => dispatch('select', id)}
        >{label}</MenuItem
      >
    {/each}
  </MenuList>
</Menu>

<div data-testid="outsideid">asd</div>
