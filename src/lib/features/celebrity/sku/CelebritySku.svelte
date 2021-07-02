<script lang="ts">
  import type { Sku, Collector } from '$lib/sku-item/types';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import NotifyButton from '$lib/notify/NotifyButton.svelte';
  import { media } from '$lib/media-query.store';
  import Gallery from '$ui/gallery/Gallery.svelte';
  import hedera from '$static/hedera.svg';
  import { getSupplyInfo } from './supplyInfo';
  import PriceBoxSku from './PriceBoxSku.svelte';
  import Collectors from './Collectors.svelte';

  export let sku: Sku;
  export let collectors: Collector[];
  export let totalCollectors: number;
  export let related: Sku[];
  $: relatedList = related.filter((item) => item._id !== sku._id);
</script>

<div class="flex" style="min-height: 70vh; background: linear-gradient(45deg, rgb(2 71 99) 0%, rgb(146 1 162) 100%);">
  <div class="container p-0 grid gap-x-8 gap-y-2 grid-cols-1 md:grid-cols-2 items-stretch">
    <div class="bg-cover bg-no-repeat" style="height: 700px;">
      <Gallery items={[sku.graphicUrl, ...sku.imageUrls]} featuredItem={sku.graphicUrl} />
    </div>
    <div class="container flex flex-col justify-between py-5 md:py-12">
      <div class="text-white">
        <div class="text-sm">
          <a href={`/collection/${sku.issuer.username}`}>{sku.issuerName}</a>
          <span class="text-gray-300 ml-2">{sku.name}</span>
        </div>
        <div class="flex justify-between mt-12 md:mt-16">
          <a class="text-xl text-gray-400" href={`/collection/${sku.issuer.username}`}>{sku.issuerName}</a>
          <Rarity rarity={sku?.rarity} class="font-bold text-lg" />
        </div>
        <div class="text-5xl mt-4">{sku.name}</div>

        <div class="mt-12 ">
          <div>{sku?.series?.name || ''}</div>
          <div class="text-gray-400 mt-4 flex gap-2">
            <span>{getSupplyInfo(sku)}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1 text-white">
        <span class="gray-text">Created by</span><span
          >@<a href="/collection/{sku.issuer.username}">{sku.issuer.username}</a></span
        >
        {#if sku.issuer.showNotifyMe}
          <span>/</span>
          <NotifyButton profile={sku.issuer} />
        {/if}
      </div>
      <PriceBoxSku {sku} />
    </div>
  </div>
</div>

<div class="mt-8">
  <div class="container grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <Accordion title={'Description'} open={true} collapsible={!$media.md}>
        <div class="mt-4 description text-gray-400">
          {@html sku?.description}
        </div>
        <div class="flex bg-gray-100 text-gray-400 px-6 py-3 rounded-3xl justify-between items-center text-sm">
          <div class="flex items-center ">
            <div class="inline-block bg-black rounded-2xl p-2 mr-4">
              <img src={hedera} alt="Hedera" class="align-middle" />
            </div>
            <span>INFINITE NFTs are minted on the Hedera Hashgraph</span>
          </div>
          <a class="" href="https://support.suku.world/infinite/hedera-hashgraph-hts">Learn more</a>
        </div>
      </Accordion>
    </div>
    <div>
      <Accordion open={true} collapsible={!$media.md}>
        <div slot="title" class="flex gap-4 items-end">
          <span>Collector Auctions</span><span class="text-gray-400 text-xl">{totalCollectors} Total</span>
        </div>
        <Collectors {collectors} skuId={sku._id} />
      </Accordion>
    </div>
  </div>
</div>

{#if relatedList.length > 0}
  <div class="mt-8">
    <div class="container">
      <Tabs class="text-xl md:text-2xl lg:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Related Releases">
          <SkuItemGrid class="mt-4" skus={relatedList} />
        </Tab>
      </Tabs>
    </div>
  </div>
{/if}

<style>
  .description :global(h3) {
    @apply font-bold;
    @apply text-black;
  }
  .description :global(p) {
    @apply my-4;
  }
  .description :global(ul) {
    @apply my-4;
    @apply list-disc;
    @apply pl-5;
  }
  .description :global(a) {
    @apply underline;
    @apply text-black;
  }
  .gray-text {
    color: #9e9e9e;
  }
</style>
