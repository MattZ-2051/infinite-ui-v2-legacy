<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { Action } from './types';
  import { mdiDotsVertical } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import iconSale from '$lib/components/icons/sale';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconAuction from '$lib/components/icons/auction';
  import iconCancelAuction from '$lib/components/icons/cancel-auction';
  import iconTransfer from '$lib/components/icons/transfer';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import {
    canCreateSale,
    canCancelSale,
    canStartAuction,
    canCancelAuction,
    canRedeem,
    canTransfer,
  } from '../product.service';
  import { onAction } from './product-actions.service';

  export let product: Product;
  export let userId: string;
  export let totalBids: number;

  $: hasCreateSellAction = canCreateSale(product, userId);
  $: hasCancelSaleAction = canCancelSale(product, userId);
  $: hasStartAuctionAction = canStartAuction(product, userId);
  $: hasCancelAuctionAction = canCancelAuction(product, userId, totalBids);
  $: hasRedeemAction = canRedeem(product, userId);
  $: hasTransferAction = canTransfer(product, userId);

  let visibleActions: Action[];
  $: visibleActions = [
    hasRedeemAction && {
      type: 'redeem',
      label: 'Redeem',
      icon: iconRedeem,
    },
    hasStartAuctionAction && {
      type: 'auction',
      label: 'Start Auction',
      icon: iconAuction,
    },
    hasCancelAuctionAction && {
      type: 'cancel-auction',
      label: 'Cancel Auction',
      icon: iconCancelAuction,
    },
    hasCreateSellAction && {
      type: 'create-sale',
      label: 'Sell Your NFT',
      icon: iconSale,
    },
    hasCancelSaleAction && {
      type: 'cancel-sale',
      label: 'Cancel Sale',
      icon: iconSale,
    },
    hasTransferAction && {
      type: 'transfer',
      label: 'Transfer',
      icon: iconTransfer,
    },
  ].filter(Boolean) as Action[];
</script>

{#if visibleActions.length > 0}
  <div class="flex items-center font-medium text-lg text-white-opacity-50">
    Actions

    <Menu placement="bottom-end">
      <MenuTrigger slot="trigger" class="ml-2.5">
        <div class="bg-white text-black rounded-full">
          <Icon path={mdiDotsVertical} size="1.5" class="p-1 rounded-full" />
        </div>
      </MenuTrigger>
      <MenuList slot="menu">
        {#each visibleActions as { type, label, icon } (type)}
          <MenuItem class="flex gap-6 justify-between" on:select={() => onAction(type, product)}>
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
