<script lang="ts">
  import { mdiChevronLeft } from '@mdi/js';
  import type { Sku } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import NotifyButton from '$lib/notify/NotifyButton.svelte';

  export let sku: Sku;
</script>

<div class="flex flex-col bg-white lg:h-full">
  <Gallery items={sku.nftPublicAssets} />
  <div class="px-6 lg:px-8 flex-grow">
    <div class="flex flex-col py-7 border-b border-gray-200 text-black gap-4">
      <div class="flex flex-wrap justify-between text-2xl">
        <span class="text-gray-400">{sku.issuerName}</span>
        <Rarity rarity={sku.rarity} />
      </div>
      <span class="text-5xl lg:mb-12">{sku.name}</span>
      {#if sku.series?.name}
        <span class="text-lg">{sku.series?.name}</span>
      {/if}
      <div class="flex gap-2">
        {#if sku.supplyType === 'fixed'}
          <span class="text-gray-400">1 of {sku.totalSupply}</span>
          <div class="border border-black rounded-xl px-2 text-center">LE</div>
        {:else if sku.supplyType === 'variable'}
          <span>{sku.circulatingSupply} Released</span>
          <a href="/marketplace/{sku._id}">(See All)</a>
        {/if}
      </div>
      <div class="flex gap-3 text-sm text-gray-400 font-black">
        <div class="font-normal">
          Created by
          <a sveltekit:prefetch href={`/collection/${sku.issuer?.username}`} class="text-black ml-1 font-black">
            @{sku.issuerName}
          </a>
        </div>
        <span>/</span>
        <NotifyButton profile={sku.issuer} />
      </div>
    </div>
    <a class="flex-grow flex justify-items-start my-5 text-lg" href="/marketplace">
      <Icon path={mdiChevronLeft} size="1.125" />
      <a sveltekit:prefetch href={`/marketplace/${sku._id}`}>View release details</a>
    </a>
  </div>
</div>
