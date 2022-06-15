<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import closeIcon from '$lib/components/icons/close';
  import Icon from '$ui/icon/Icon.svelte';
  import { clearRequiredSkus, gateKeepSkus, gateKeepType } from './gateKeeping.store';
  import NftDetails from './NftDetails.svelte';
  import { getActiveListings } from '../sku/sku.service';
  import FromCreator from '../sku/pricebox/button/FromCreator.svelte';
  import { redirectToMarketplace } from './gateKeeping.service';

  export let sku: Sku;

  $: singleGateKeepSku = $gateKeepSkus?.[0] && $gateKeepSkus.length === 1 ? $gateKeepSkus[0].sku : undefined;
  $: activeListings = singleGateKeepSku && getActiveListings(singleGateKeepSku);
  $: active =
    singleGateKeepSku &&
    activeListings.length > 0 &&
    singleGateKeepSku.totalSupplyLeft &&
    activeListings?.[0]?.saleType !== 'giveaway';

  $: nextSkuBuy = $gateKeepSkus.find(
    (gateKeepSku) => gateKeepSku.status === 'buyNow' || gateKeepSku.status === 'notOwnedYet'
  );

  const handleClose = () => {
    clearRequiredSkus();
  };

  const handleBuyNowClick = (id) => {
    clearRequiredSkus();
    redirectToMarketplace(id);
  };
</script>

<div class="w-full h-full px-2 pt-9 md:pt-14 md:px-12">
  {#if $gateKeepType === 'and'}
    <div class="flex items-center justify-between">
      <p class="text-2xl pr-6 md:text-4xl">You need to own these!</p>
      <span class="cursor-pointer" on:click={handleClose}><Icon path={closeIcon} size={1.5} /></span>
    </div>
    <p class="font-light text-base pt-6">
      In order to buy <span class="font-semibold">{sku?.name}</span> you need to buy and own these NFTs:
    </p>
  {:else}
    <div class="flex items-center justify-between">
      <p class="text-2xl pr-6 md:text-4xl">You need to own this!</p>
      <span class="cursor-pointer" on:click={handleClose}><Icon path={closeIcon} size={1.5} /></span>
    </div>
    <p class="font-light text-base pt-6">
      In order to buy <span class="font-semibold">{sku?.name}</span> you need to buy and own
      <span class="font-semibold">{nextSkuBuy?.sku.name}</span> first.
    </p>
  {/if}

  <div class="pt-12">
    {#each $gateKeepSkus as item}
      <NftDetails
        name={item.sku?.name}
        sourceImg={item.sku.nftPublicAssets?.[0]}
        status={item.status}
        handleClick={() => handleBuyNowClick(item.sku._id)}
        showToolTip={item.status === 'buyNow' && $gateKeepType !== 'and' && $gateKeepSkus.length > 1}
      />
    {/each}
    {#if $gateKeepSkus.length > 1 && $gateKeepType !== 'and'}
      <NftDetails
        name={sku?.name}
        sourceImg={sku?.nftPublicAssets?.[0]}
        status="nowViewing"
        handleClick={() => handleBuyNowClick(sku?._id)}
      />
    {/if}
  </div>
  <div class="pt-12">
    {#if active}
      <FromCreator
        sku={singleGateKeepSku}
        state="active"
        {activeListings}
        onBuy={() => handleBuyNowClick(singleGateKeepSku._id)}
      />
    {/if}
  </div>
</div>
