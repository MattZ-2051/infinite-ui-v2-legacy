<script lang="ts">
  import { slide } from 'svelte/transition';
  import closeIcon from '$lib/components/icons/close';
  import Icon from '$ui/icon/Icon.svelte';
  import { clearRequiredSkus, gateKeepSkus } from './gateKeeping.store';
  import NftDetails from './NftDetails.svelte';
  import { getActiveListings } from '../sku/sku.service';
  import FromCreator from '../sku/pricebox/button/FromCreator.svelte';
  import { sku } from '../sku/sku.store';
  import { redirectToMarketplace } from './gateKeeping.service';

  $: singleGateKeepSku = $gateKeepSkus?.[0] && $gateKeepSkus.length === 1 ? $gateKeepSkus[0] : undefined;
  $: activeListings = singleGateKeepSku && getActiveListings(singleGateKeepSku);
  $: active =
    singleGateKeepSku &&
    activeListings.length > 0 &&
    singleGateKeepSku.totalSupplyLeft &&
    activeListings?.[0]?.saleType !== 'giveaway';

  const handleClose = () => {
    clearRequiredSkus();
  };
</script>

<div class="w-full h-full px-8 pt-8" transition:slide>
  <div class="flex items-center justify-between">
    <p class="text-4xl pr-6">You need to own this!</p>
    <span class="cursor-pointer" on:click={handleClose}><Icon path={closeIcon} size={2} /></span>
  </div>
  <p class="font-light text-base pt-6">
    In order to buy <span class="font-semibold">{$sku.name}</span> you need to buy and own
    <span class="font-semibold">{$gateKeepSkus?.[0]?.name}</span> first.
  </p>

  <div class="pt-12">
    {#each $gateKeepSkus as sku}
      <NftDetails
        name={sku.name}
        sourceImg={sku.nftPublicAssets?.[0]}
        status="notOwnedYet"
        handleClick={() => redirectToMarketplace(sku._id)}
        showToolTip={false}
      />
    {/each}
  </div>
  <div class="pt-12">
    {#if active}
      <FromCreator
        sku={singleGateKeepSku}
        state="active"
        {activeListings}
        onBuy={() => redirectToMarketplace(singleGateKeepSku._id)}
      />
    {/if}
  </div>
</div>
