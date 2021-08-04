<svelte:options immutable={true} />

<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { mdiChevronLeft } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Breadcrumb, BreadcrumbItem } from '$ui/breadcrumbs';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import NotifyButton from '$lib/notify/NotifyButton.svelte';
  import HederaLink from '$lib/product/HederaLink.svelte';
  import routes from '$lib/routes';

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
      <Breadcrumb>
        {#if _sku.supplyType === 'fixed'}
          <BreadcrumbItem>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">1 of {_sku.totalSupply}</span>
              <div class="border border-black rounded-xl px-2 text-center">LE</div>
            </div>
          </BreadcrumbItem>
        {:else if _sku.supplyType === 'variable'}
          <BreadcrumbItem>
            <div class="flex items-center gap-2">
              <span>{_sku.circulatingSupply} Released</span>
              <a href={routes.sku(_sku._id)}>(See All)</a>
            </div>
          </BreadcrumbItem>
        {/if}
        {#if product}
          <BreadcrumbItem>
            <HederaLink tokenId={product.tokenId} explorerLink={product.explorerLink} />
          </BreadcrumbItem>
        {/if}
      </Breadcrumb>
      <Breadcrumb class="text-gray-500">
        <BreadcrumbItem>
          <UserLink prefix="Created by" username={_sku.issuer?.username} class="text-black font-black"
            >@{_sku.issuerName}</UserLink
          >
        </BreadcrumbItem>
        {#if _sku.issuer?.showNotifyMe}
          <BreadcrumbItem>
            <NotifyButton profile={_sku.issuer} />
          </BreadcrumbItem>
        {/if}
      </Breadcrumb>
    </div>
    <a class="flex-grow flex justify-items-start my-5 text-lg" href={routes.marketplace}>
      <Icon path={mdiChevronLeft} size="1.125" />
      <a sveltekit:prefetch href={routes.sku(_sku._id)} class="link">View release details</a>
    </a>
  </div>
</div>
