<svelte:options immutable={true} />

<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { mdiChevronLeft } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import NotifyButton from '$lib/notify/NotifyButton.svelte';
  import HederaLink from '$lib/product/HederaLink.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  let _sku: Sku;
  $: _sku = product
    ? { ...product.sku, totalSupply: product.totalSupply, circulatingSupply: product.circulatingSupply }
    : sku;
</script>

<div class="flex flex-col bg-white lg:h-full">
  <Gallery items={_sku.nftPublicAssets} />
  <div class="px-6 lg:px-8 flex-grow">
    <div class="flex flex-col py-7 border-b border-gray-200 text-black gap-4">
      <div class="flex flex-wrap justify-between text-2xl">
        <span class="text-gray-400">{_sku.issuerName}</span>
        <Rarity rarity={_sku.rarity} />
      </div>
      <span class="text-5xl lg:mb-12">{_sku.name}</span>
      {#if _sku.series?.name}
        <span class="text-lg">{_sku.series?.name}</span>
      {/if}
      <div class="flex gap-2">
        {#if _sku.supplyType === 'fixed'}
          <span class="text-gray-400">1 of {_sku.totalSupply}</span>
          <div class="border border-black rounded-xl px-2 text-center">LE</div>
        {:else if _sku.supplyType === 'variable'}
          <span>{_sku.circulatingSupply} Released</span>
          <a href="/marketplace/{_sku._id}">(See All)</a>
        {/if}
        {#if product}
          <HederaLink tokenId={product.tokenId} explorerLink={product.explorerLink} />
        {/if}
      </div>
      <div class="flex gap-3 text-sm text-gray-400 font-black">
        <div class="font-normal">
          <UserLink prefix="Created by" username={_sku.issuer?.username} class="text-black font-black"
            >@{_sku.issuerName}</UserLink
          >
        </div>
        <span>/</span>
        <NotifyButton profile={_sku.issuer} />
      </div>
    </div>
    <a class="flex-grow flex justify-items-start my-5 text-lg" href="/marketplace">
      <Icon path={mdiChevronLeft} size="1.125" />
      <a sveltekit:prefetch href={`/marketplace/${_sku._id}`}>View release details</a>
    </a>
  </div>
</div>
