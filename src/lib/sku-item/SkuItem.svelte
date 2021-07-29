<script lang="ts">
  import type { Sku } from './types';
  import { FilePreview } from '$ui/file';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';

  export let item: Sku;
</script>

<a sveltekit:prefetch href={`/marketplace/${item._id}`} class="flex flex-col tracking-tighter">
  <div class="bg-black w-full h-72 card-img relative">
    <FilePreview item={item.nftPublicAssets?.[0]} preview />
    {#if item.redeemable}
      <div class="absolute top-6 right-4">
        <IconRedeem size="1.3" class="bg-white text-black rounded-full p-1.5 border" />
      </div>
    {/if}
  </div>
  <div class="px-5 pt-3 pb-10 bottom-half-container rounded-b-3xl flex flex-col flex-grow justify-between">
    <div>
      <div class="flex justify-between ">
        <span class=" card-name ">{item.issuerName}</span>
        <Rarity rarity={item.rarity} />
      </div>
      <div class="mt-5 mb-2">
        <span class=" text-2.5xl font-light card-title">{item.name}</span>
      </div>
    </div>
    <div class="flex justify-between mt-8 gap-1">
      <span class="card-series">{item.series?.name || ''}</span>
      <div class=" flex items-end">
        <slot name="info" />
      </div>
    </div>
  </div>
  <slot name="status" />
</a>

<style>
  .bottom-half-container {
    background-color: var(--card-container-color, #ffffff);
    border: var(--bottom-border, 1px solid #ededed);
  }
  .card-name {
    color: var(--card-name-color, #9e9e9e);
  }
  .card-title {
    color: var(--card-title-color, #000000);
  }
  .card-series {
    color: var(--card-series-color, #000000);
  }
</style>
