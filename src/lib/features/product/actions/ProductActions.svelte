<script lang="ts">
  import type { Action, ActionType } from './types';
  import { mdiDotsVertical } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import iconSale from '$lib/components/icons/sale';
  import iconRedeem from '$lib/components/icons/redeem';
  import MenuVariantDark from '$ui/menu/variants/MenuVariantDark.svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';

  export let actions: ActionType[];

  const dispatch = createEventDispatcher();

  let trigger: HTMLElement;
  let showActions = false;

  const availableActions: { [key: string]: Action } = {
    redeem: {
      type: 'redeem',
      label: 'Redeem',
      icon: iconRedeem,
    },
    'create-sale': {
      type: 'create-sale',
      label: 'Create Sale',
      icon: iconSale,
    },
    'cancel-sale': {
      type: 'cancel-sale',
      label: 'Cancel Sale',
      icon: iconSale,
    },
  };

  $: visibleActions = actions.filter(Boolean).map((key) => availableActions[key]);

  function onAction(type: ActionType) {
    onClose();
    dispatch('action', type);
  }

  function onClose() {
    showActions = false;
  }
</script>

{#if visibleActions.length > 0}
  <div class="flex items-center font-medium text-lg text-gray-500">
    Actions
    <button
      bind:this={trigger}
      class="rounded-3xl bg-gray-800 hover:bg-white hover:text-black ml-2.5 p-3"
      on:click={() => (showActions = !showActions)}
    >
      <Icon path={mdiDotsVertical} />
    </button>
  </div>
{/if}

{#if showActions}
  <MenuVariantDark>
    <Menu {trigger} offset={4} position="bottom-end" on:close={onClose}>
      {#each visibleActions as { type, label, icon } (type)}
        <MenuItem class="flex gap-6 justify-between" on:click={() => onAction(type)}>
          {label}
          {#if icon}
            <Icon path={icon} />
          {/if}
        </MenuItem>
      {/each}
    </Menu>
  </MenuVariantDark>
{/if}
