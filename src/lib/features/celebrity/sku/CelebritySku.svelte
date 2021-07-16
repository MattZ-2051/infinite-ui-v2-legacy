<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import xss from 'xss';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import NotifyButton from '$lib/notify/NotifyButton.svelte';
  import { media } from '$lib/media-query.store';
  import Gallery from '$lib/components/Gallery.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';
  import UserLink from '$lib/components/UserLink.svelte';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import { getSupplyInfo } from './supplyInfo';
  import PriceBoxSku from './PriceBoxSku.svelte';
  import Collectors from './Collectors.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let totalCollectors: number;
  export let related: Sku[];
</script>

<div class="flex justify-around bg-gray-900 sku-details">
  <div class="container grid gap-x-8 grid-cols-1 md:grid-cols-2 items-stretch -container-y md:-container-x">
    <div class="-container-x md:-container-none">
      <Gallery items={sku.nftPublicAssets} />
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex flex-col py-5 gap-4 text-white">
        <div>
          <div class="text-sm flex gap-2">
            <a sveltekit:prefetch href="/marketplace">Marketplace</a>
            <span class="italic text-gray-300">/</span>
            <span class="text-gray-300">{sku.name}</span>
          </div>
          <div class="flex justify-between mt-12">
            <UserLink username={sku.issuer.username} class="text-xl text-gray-400">{sku.issuerName}</UserLink>
            <Rarity rarity={sku?.rarity} class="font-bold text-lg" />
          </div>
          <div class="text-5xl mt-4">{sku.name}</div>

          <div class="mt-6">
            <div>{sku?.series?.name || ''}</div>
            <div class="text-gray-400 mt-4">
              <span>{getSupplyInfo(sku)}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow gap-4">
          <div class="flex items-center gap-2">
            <span class="gray-text">Created by</span>
            <UserLink username={sku.issuer.username} />
            {#if sku.issuer.showNotifyMe}
              <span>/</span>
              <NotifyButton profile={sku.issuer} />
            {/if}
          </div>
          {#if sku.redeemable}
            <div class="border-t broder-gray-800 w-10" />
            <div class="flex gap-2 items-center">
              <IconRedeem class="bg-white text-black rounded-full border p-1.5" size="1.3" />
              Redeemable
            </div>
          {/if}
        </div>
      </div>
      <div class="-container-x">
        <PriceBoxSku {sku} />
      </div>
    </div>
  </div>
</div>
<div class="mt-8">
  <div class="container grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <Accordion title={'Description'} open={true} collapsible={!$media.md}>
        <div class="mt-4 description text-gray-400">
          {@html xss(sku.description || '')}
        </div>
        <div class="mt-4 flex bg-gray-100 text-gray-400 px-6 py-3 rounded-3xl justify-between items-center text-sm">
          <div class="flex items-center ">
            <div class="inline-block bg-black rounded-2xl p-2 mr-4">
              <Icon path={hedera} size="0.6" />
            </div>
            <span>INFINITE NFTs are minted on the Hedera Hashgraph</span>
          </div>
          <a href="https://support.suku.world/infinite/hedera-hashgraph-hts" class="link">Learn more</a>
        </div>
      </Accordion>
    </div>
    <div>
      <Accordion open={true} collapsible={!$media.md}>
        <div slot="title" class="flex gap-4 items-end">
          <span>Collectors</span>
          {#if totalCollectors > 0}<span class="text-gray-400 text-xl">{totalCollectors} Total</span>{/if}
        </div>
        <Collectors {collectors} skuId={sku._id} />
      </Accordion>
    </div>
    <PrivateAsset skuId={sku._id} let:total={totalPrivateAssets}>
      {#if totalPrivateAssets > 0}
        <div>
          <Accordion title={'Owner Access'} open={true} collapsible={!$media.md}>
            <PrivateAssetList />
          </Accordion>
        </div>
      {/if}
    </PrivateAsset>
  </div>
</div>

{#if related.length > 0}
  <div class="mt-8">
    <div class="container">
      <Tabs class="text-xl md:text-2xl lg:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Related Releases">
          <SkuItemGrid class="mt-4" skus={related} />
        </Tab>
      </Tabs>
    </div>
  </div>
{/if}

<style lang="postcss">
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
  @media only screen and (min-width: 600px) {
    .sku-details {
      background: linear-gradient(45deg, rgb(2 71 99) 0%, rgb(146 1 162) 100%);
    }
  }
</style>
