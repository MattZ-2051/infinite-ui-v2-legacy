<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Sku, Product } from '$lib/sku-item/types';
  import arrowRightCircle from '$project/assets/lib/arrow-right-circle';
  import { FilePreview } from '$ui/file';
  import ethereum from '$lib/components/icons/ethereum';
  import hedera from '$lib/components/icons/hedera';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';
  import { formatDate } from '$util/format';
  import SkuEdition from './SkuEdition.svelte';
  import SkuStatus from './SkuStatus.svelte';

  let _sku: Sku = undefined;

  export { _sku as sku };
  export let product: Product = undefined;
  export let isPhase3 = false;

  $: sku = product ? product.sku : _sku;
  $: activeListing = product ? product.activeProductListings?.[0] : sku.activeSkuListings?.[0];
  $: href = isPhase3 ? (product ? routes.product(product._id) : routes.sku(sku._id)) : '';
  $: currency = product ? product.sku.currency : sku.currency;
</script>

<article id={sku._id} class="space-y-4 py-6" in:fade={{ duration: 300 }}>
  <a sveltekit:prefetch {href} class="space-y-4 py-6">
    <figure class="relative mx-6 mb-0">
      <FilePreview item={sku.nftPublicAssets?.[0]} preview borderRadius={'0.65rem'} />
      {#if activeListing?.endDate}
        <figcaption
          class="absolute bottom-4 left-4 px-4 py-2 space-x-1 text-base font-bold text-default bg-black-opacity-50 backdrop-blur-[2px]"
        >
          <span class="opacity-50">Ends</span>
          <span>{formatDate(activeListing.endDate)}</span>
        </figcaption>
      {/if}
    </figure>
    <div class="info mx-6 space-y-4">
      <section class="text-gray-500 flex flex-row items-center flex-wrap justify-between">
        <div class="issuer-link text-default">
          <TalentLink profile={sku.issuer} hideImage class="normal-case font-light" />
        </div>
        {#if sku.redeemable}
          <div class="flex flex-row items-center space-x-2 text-gray-700 font-normal text-base">
            <IconRedeem size={24}>Redeemable</IconRedeem>
          </div>
        {/if}
      </section>
      <header>
        <div class="mb-4 flex text-2xl md:text-3xl items-center gap-2 justify-between font-light">
          <h2 class="line-clamp-2">{sku.name}</h2>
          {#if product?.serialNumber}
            <div>#{product.serialNumber}</div>
          {/if}
        </div>
      </header>
      <div class="flex flex-row items-center space-x-2 font-light text-base">
        {#if currency === 'USD'}
          <Icon path={hedera} size="1em" tooltip="HTS NFT minted on Hedera" class="inline align-baseline" />
        {:else if currency === 'ETH'}
          <Icon path={ethereum} size="1em" tooltip="ERC721 NFT minted on Ethereum" class="inline align-baseline" />
        {/if}
        <SkuEdition {sku} {product} />
        {#if sku?.skuCollection}
          <span class="sku-collection-name pl-2">{sku?.skuCollection?.name}</span>
        {/if}
      </div>
    </div>
    <div class="sku-status mr-6">
      <div class="mt-5 mx-6 flex flex-row items-center text-lg font-light" aria-label="Product details">
        <SkuStatus {sku} {product} />
        <span class={`${isPhase3 ? 'item-link ml-auto -mr-6' : 'hidden'}`}>
          <Icon
            path={arrowRightCircle}
            size={1.7}
            color="var(--sku-item-color, var(--default-color))"
            viewBox="0 -4 14 32"
          />
        </span>
      </div>
    </div>
  </a>
</article>

<style>
  article {
    color: var(--sku-item-color, var(--default-color));
    background-color: var(--sku-item-bg-color);
    background-image: var(--sku-item-image);
    border: var(--sku-item-border-width, 1px) solid var(--sku-item-border-color, var(--default-color));
    border-radius: var(--sku-item-border-radius, 0);
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
    transition: 0.5s;
  }
  article:hover {
    transition: 0.5s;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.3);
  }

  article:hover .item-link {
    background: none black;
  }

  .sku-collection-name {
    box-shadow: inset 1px 0 theme('colors.gray.700');
  }

  .sku-status {
    border-color: var(--sku-item-status-border-color);
    border-style: solid;
    border-top-width: 2px;
    border-radius: 60px 0 0 0;
  }
  .info {
    min-height: 9.5rem;
  }
  .item-link {
    color: var(--sku-item-bg-color, var(--default-color));
  }
  .issuer-link {
    font-size: 1rem;
    font-weight: normal;
    text-transform: uppercase;
  }
</style>
