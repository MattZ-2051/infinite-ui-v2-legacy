<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiBellOffOutline, mdiBellOutline } from '@mdi/js';
  import { ENABLE_ETH_CURRENCY } from '$project/variables';
  import shareIcon from '$lib/features/sku/assets/share';
  import ethereum from '$lib/components/icons/ethereum';
  import hedera from '$lib/components/icons/hedera';
  import notRedeemable from '$lib/components/icons/not-redeemable';
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

  let listing = sku.activeSkuListings?.[0];
  let issuerProductListing = sku.activeProductListings.find((p) => p.issuer === sku.issuer._id);
  listing = listing || issuerProductListing;

  if (!listing) {
    listing =
      sku.expiredSkuListings.length > 0
        ? sku.expiredSkuListings?.reduce(
            (previous, act) => (previous.endDate > act.endDate ? previous : act),
            sku.expiredSkuListings[0]
          )
        : sku.soldSkuListings?.reduce(
            (previous, act) => (previous.endDate > act.endDate ? previous : act),
            sku.soldSkuListings[0]
          );
  }

  $: activeSku = listing;
  $: isActiveSkuAuction = activeSku?.saleType === 'auction';
  $: isActiveSale = activeSku?.saleType === 'fixed' || activeSku?.saleType === 'giveaway';
  $: startDate = activeSku?.startDate || '';
  $: endDate = activeSku?.endDate || '';
</script>

<div
  class="border rounded-lg overflow-hidden sku-info"
  style="border-color: var(--sku-info-border-color, rgba(255,255,255,0.2));"
>
  <div
    class="sku-info-row p-6 border-b flex justify-between"
    style="border-color: var(--sku-info-border-color, rgba(255,255,255,0.2));"
  >
    <div class="flex flex-col gap-2">
      <div class="text-gray-500 text-sm">Edition</div>
      <div><SkuEdition {sku} /></div>
    </div>
    {#if ENABLE_ETH_CURRENCY}
      <div class="flex flex-col gap-2">
        <div class="text-gray-500 text-sm text-right">NFT Type</div>
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
    {/if}
  </div>
  {#if isActiveSkuAuction}
    <div
      class="sku-info-row p-6 border-b flex justify-between space-x-8"
      style="border-color: var(--sku-info-border-color, rgba(255,255,255,0.2));"
    >
      <div class="flex flex-col gap-2 text-left">
        <div class="text-gray-500 text-sm">Auction Starts</div>
        <div>{formatDate(startDate)}</div>
      </div>
      <div class="flex flex-col gap-2 text-right">
        <div class="text-gray-500 text-sm">Auction Ends</div>
        <div>{formatDate(endDate)}</div>
      </div>
    </div>
  {:else if isActiveSale}
    <div
      class="sku-info-row p-6 border-b flex justify-between"
      style="border-color: var(--sku-info-border-color, rgba(255,255,255,0.2));"
    >
      <div class="flex flex-col gap-2 text-left">
        <div class="text-gray-500 text-sm">Active Sale Starts</div>
        <div>{formatDate(startDate)}</div>
      </div>
      {#if activeSku?.endDate}
        <div class="flex flex-col gap-2 text-right">
          <div class="text-gray-500 text-sm">Active Sale Ends</div>
          <div>{formatDate(endDate)}</div>
        </div>
      {/if}
    </div>
  {/if}
  <div class="sku-info-row p-6 border-b border-opacity-20 flex justify-between">
    <div class="flex flex-col gap-2 min-w-0 mr-3">
      <div class="text-gray-500 text-sm">Created by</div>
      <TalentLink profile={sku.issuer} />
    </div>
    <div class="flex flex-col gap-2 text-right">
      {#if sku.redeemable}
        <div class="text-gray-500 text-sm">Redemption Status</div>
        <IconRedeem>Redeemable</IconRedeem>
      {:else}
        <div class="text-gray-500 text-sm">Redemption Status</div>
        <div class="flex">
          <Icon path={notRedeemable} /><span>Not Redeemable</span>
        </div>
      {/if}
    </div>
  </div>
  <ButtonGroup class="grid grid-cols-2 divide-x divide-gray-200">
    <Notify profile={sku.issuer} let:loading let:subscription let:notifyHandler>
      <button
        type="button"
        class="sku-info-row flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
        disabled={loading}
        on:click={notifyHandler}
        ><Icon path={subscription ? mdiBellOffOutline : mdiBellOutline} />
        {#if subscription}Unsubscribe{:else}Notify Me{/if}
      </button>
    </Notify>
    <button
      type="button"
      class="sku-info-row flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
      use:socialShareAction={{ sku }}><Icon path={shareIcon} />Share</button
    >
  </ButtonGroup>
</div>

<style lang="postcss">
  @media screen and (min-width: 768px) and (max-height: 920px) {
    .sku-info-row {
      padding-top: min(1.8vh, 1.5rem);
      padding-bottom: min(1.8vh, 1.5rem);
    }
  }

  .sku-info {
    color: var(--sku-info-color, white);
  }
</style>
