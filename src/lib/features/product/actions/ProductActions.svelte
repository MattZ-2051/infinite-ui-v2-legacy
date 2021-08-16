<script lang="ts">
  import type { Action, ActionType } from './types';
  import { mdiDotsVertical } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import iconSale from '$lib/components/icons/sale';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconAuction from '$lib/components/icons/auction';
  import iconCancelAuction from '$lib/components/icons/cancel-auction';
  import iconTransfer from '$lib/components/icons/transfer';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';

  export let actions: ActionType[];

  const dispatch = createEventDispatcher();

  const availableActions: { [key: string]: Action } = {
    redeem: {
      type: 'redeem',
      label: 'Redeem',
      icon: iconRedeem,
    },
    auction: {
      type: 'auction',
      label: 'Start Auction',
      icon: iconAuction,
    },
    'cancel-auction': {
      type: 'cancel-auction',
      label: 'Cancel Auction',
      icon: iconCancelAuction,
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
    transfer: {
      type: 'transfer',
      label: 'Transfer',
      icon: iconTransfer,
    },
  };

  $: visibleActions = actions.filter(Boolean).map((key) => availableActions[key]);

  function onAction(type: ActionType) {
    dispatch('action', type);
  }
</script>

{#if visibleActions.length > 0}
  <div class="flex items-center font-medium text-lg text-gray-500">
    Actions

    <Menu placement="bottom-end">
      <MenuTrigger slot="trigger" class="rounded-2xl bg-gray-800 hover:bg-white hover:text-black ml-2.5 p-2">
        <Icon path={mdiDotsVertical} />
      </MenuTrigger>
      <MenuList slot="menu">
        {#each visibleActions as { type, label, icon } (type)}
          <MenuItem class="flex gap-6 justify-between" on:select={() => onAction(type)}>
            {label}
            {#if icon}
              <Icon class="inline" path={icon} />
            {/if}
          </MenuItem>
        {/each}
      </MenuList>
    </Menu>
  </div>
{/if}
