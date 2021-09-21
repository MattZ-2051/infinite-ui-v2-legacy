<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { Action } from './types';
  import Icon from '$ui/icon/Icon.svelte';
  import iconSale from '$lib/components/icons/sale';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconAuction from '$lib/components/icons/auction';
  import iconTransfer from '$lib/components/icons/transfer';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import { canCreateSale, canStartAuction, canRedeem, canTransfer } from '../product.service';
  import { onAction } from './product-actions.service';

  export let product: Product;
  export let userId: string;

  $: hasCreateSellAction = canCreateSale(product, userId);
  $: hasStartAuctionAction = canStartAuction(product, userId);
  $: hasRedeemAction = canRedeem(product, userId);
  $: hasTransferAction = canTransfer(product, userId);

  let visibleActions: Action[] = [];
  $: visibleActions = [
    hasRedeemAction && {
      type: 'redeem',
      label: 'Redeem',
      icon: iconRedeem,
    },
    hasTransferAction && {
      type: 'transfer',
      label: 'Transfer',
      icon: iconTransfer,
    },
    hasCreateSellAction && {
      type: 'create-sale',
      label: 'Sell',
      icon: iconSale,
    },
    hasStartAuctionAction && {
      type: 'auction',
      label: 'Auction',
      icon: iconAuction,
    },
  ].filter(Boolean) as Action[];
</script>

{#if visibleActions.length > 0}
  <ButtonGroup class="flex col-span-2 lg:col-span-1">
    {#each visibleActions as { type, label, icon } (type)}
      <button
        type="button"
        on:click={() => onAction(type, product)}
        class="flex flex-grow flex-col items-center justify-center text-sm gap-2 p-4 w-20 bg-gray-50 hover:bg-primary"
      >
        <Icon class="inline" path={icon} />
        <span>{label}</span>
      </button>
    {/each}
  </ButtonGroup>
{/if}
