<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiBellOffOutline, mdiBellOutline, mdiShareVariant as shareIcon } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
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
  <div class="p-6 border-b border-opacity-20 flex justify-between">
    <div class="flex flex-col gap-2">
      <div class="text-gray-500 text-sm">Created by</div>
      <TalentLink profile={sku.issuer} />
    </div>
    <div class="flex flex-col gap-2 text-right">
      {#if sku.redeemable}
        <div class="text-gray-500 text-sm">Status</div>
        <div class="flex items-center gap-2">
          <IconRedeem /> Redeemable
        </div>
      {/if}
    </div>
  </div>
  <div class="grid grid-cols-2 divide-x divide-gray-200">
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
  </div>
</div>

<style>
  button {
    color: var(--sku-info-button-color);
    background-color: var(--sku-info-button-bg-color);
  }
  button:hover {
    color: var(--sku-info-button-color-hover);
    background-color: var(--sku-info-button-bg-color-hover);
  }
</style>
