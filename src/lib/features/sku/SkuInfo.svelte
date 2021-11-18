<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiBellOffOutline, mdiBellOutline } from '@mdi/js';
  import { ENABLE_ETH_CURRENCY } from '$project/variables';
  import shareIcon from '$lib/features/sku/assets/share';
  import ethereum from '$lib/components/icons/ethereum';
  import hedera from '$lib/components/icons/hedera';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import { Notify } from '$lib/notify';
  import { socialShareAction } from '$lib/social';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import { formatDate } from '$util/format';

  export let sku: Sku;

  $: activeProduct = sku.activeProductListings?.[0];
  $: activeSku = sku.activeSkuListings?.[0];
  $: isActiveAuction = activeProduct?.saleType === 'auction';
  $: isActiveSale = activeProduct?.saleType === 'fixed' || activeSku?.saleType === 'fixed';
</script>

<div class="border border-white border-opacity-20 rounded-lg text-white overflow-hidden">
  {#if ENABLE_ETH_CURRENCY}
    <div class="p-6 border-b border-opacity-20 border-white flex justify-between">
      <div class="flex flex-col gap-2">
        <div class="text-gray-500 text-sm">Edition</div>
        <div><SkuEdition {sku} /></div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-gray-500 text-sm text-right">NFT Type:</div>
        {#if sku.currency === 'ETH'}
          <div use:tooltip={'ERC721 NFT minted on Ethereum'} class="flex flex-row items-center space-x-1 justify-end">
            <Icon path={ethereum} size="1em" class="inline align-baseline mx-0.5" />
            <span>ERC721</span>
          </div>
        {:else if sku.currency === 'USD'}
          <div use:tooltip={'HTS NFT minted on Hedera'} class="flex flex-row items-center space-x-1 justify-end">
            <Icon path={hedera} size="0.75em" class="inline align-baseline mx-0.5" />
            <span> HTS </span>
          </div>
        {/if}
      </div>
    </div>
    <div class="p-6 border-b border-opacity-20 border-white flex justify-between">
      {#if isActiveAuction}
        <div class="flex flex-col gap-2 text-left">
          <div class="text-gray-500 text-sm">Active Auction</div>
          <div>Ends {formatDate(activeProduct.endDate)}</div>
        </div>
      {:else if isActiveSale}
        <div class="flex flex-col gap-2 text-left">
          <div class="text-gray-500 text-sm">Active Sale:</div>
          <div>Started {formatDate(activeProduct?.startDate || activeSku?.startDate)}</div>
        </div>
      {/if}
    </div>
  {:else}
    <div class="p-6 border-b border-opacity-20 border-white flex justify-between">
      <div class="flex flex-col gap-2">
        <div class="text-gray-500 text-sm">Edition</div>
        <div><SkuEdition {sku} /></div>
      </div>
      {#if isActiveAuction}
        <div class="flex flex-col gap-2 text-right">
          <div class="text-gray-500 text-sm">Active Auction</div>
          <div>Ends {formatDate(activeProduct.endDate)}</div>
        </div>
      {:else if isActiveSale}
        <div class="flex flex-col gap-2 text-right">
          <div class="text-gray-500 text-sm">Active Sale:</div>
          <div>Started {formatDate(activeProduct?.startDate || activeSku?.startDate)}</div>
        </div>
      {/if}
    </div>
  {/if}
  <div class="p-6 border-b border-opacity-20 flex justify-between">
    <div class="flex flex-col gap-2 min-w-0 mr-3">
      <div class="text-gray-500 text-sm">Created by</div>
      <TalentLink profile={sku.issuer} />
    </div>
    <div class="flex flex-col gap-2 text-right">
      {#if sku.redeemable}
        <div class="text-gray-500 text-sm">Condition</div>
        <IconRedeem>Redeemable</IconRedeem>
      {/if}
    </div>
  </div>
  <ButtonGroup class="grid grid-cols-2 divide-x divide-gray-200">
    <Notify profile={sku.issuer} let:loading let:subscription let:notifyHandler>
      <button
        type="button"
        class="flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
        disabled={loading}
        on:click={notifyHandler}
        ><Icon path={subscription ? mdiBellOffOutline : mdiBellOutline} />
        {#if subscription}Unsubscribe{:else}Notify Me{/if}
      </button>
    </Notify>
    <button
      type="button"
      class="flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
      use:socialShareAction={{ sku }}><Icon path={shareIcon} />Share</button
    >
  </ButtonGroup>
</div>
