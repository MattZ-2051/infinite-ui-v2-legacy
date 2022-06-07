<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Product, Sku } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { isSkuV2 } from '$lib/infinite-api-sdk/guard.service';
  import arrowRightCircle from '$project/assets/lib/arrow-right-circle';
  import { FilePreview } from '$ui/file';
  import ethereum from '$lib/components/icons/ethereum';
  import hedera from '$lib/components/icons/hedera';
  import information from '$lib/components/icons/information';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';
  import { formatDate } from '$util/format';
  import SkuEdition from './SkuEdition.svelte';
  import SkuStatus from './SkuStatus.svelte';

  let _sku: Sku | SkuV2 = undefined;

  export { _sku as sku };
  export let product: Product = undefined;

  $: sku = product ? product.sku : _sku;
  $: href = product ? routes.product(product._id) : routes.sku(sku._id);
  $: currency = product ? product.sku.currency : sku.currency;

  let activeListing = undefined;
  $: if (product) {
    activeListing = product.activeProductListings?.[0];
  } else if (isSkuV2(sku)) {
    activeListing = sku.activeSkuListing;
  } else {
    activeListing = sku.activeSkuListings?.[0];
  }
  $: hasCaption = activeListing?.endDate || sku?.status === 'pending' || sku?.status === 'rejected';
</script>

<article id={sku._id} class="space-y-4 py-6" in:fade={{ duration: 300 }}>
  <a sveltekit:prefetch {href} class="space-y-4 py-6">
    <figure class="relative mx-6 mb-0">
      <FilePreview item={isSkuV2(sku) ? sku?.nftPublicAsset : sku?.nftPublicAssets?.[0]} preview />
      {#if hasCaption}
        <figcaption
          class="absolute bottom-4 left-4 px-4 py-2 space-x-1 text-base font-bold bg-white bg-opacity-80 text-black"
        >
          {#if activeListing?.endDate}
            <span class="opacity-50">Ends</span>
            <span>{formatDate(activeListing.endDate)}</span>
          {:else if sku?.status === 'pending'}
            <div class="flex gap-2">
              <div class="rounded-full text-white bg-warning w-min p-1">
                <Icon path={information} size="0.9em" />
              </div>
              <span>Pending</span>
            </div>
          {:else if sku?.status === 'rejected'}
            <div class="flex gap-2">
              <div class="rounded-full text-white bg-error w-min p-1">
                <Icon path={information} size="0.9em" tooltip={sku.rejectReason} />
              </div>
              <span>Rejected</span>
            </div>
          {/if}
        </figcaption>
      {/if}
    </figure>
    <div class="info mx-6 space-y-4">
      <section class="text-gray-500 flex flex-row items-center flex-wrap justify-between">
        <div class="issuer-link">
          <TalentLink profile={sku.issuer} hideImage />
        </div>
        {#if sku?.redeemable}
          <div class="flex flex-row items-center space-x-2 text-gray-700 font-normal text-base">
            <IconRedeem size={24}>Redeemable</IconRedeem>
          </div>
        {/if}
      </section>
      <header>
        <div class="mb-4 flex text-2xl items-center gap-2 justify-between">
          <h2 class="line-clamp-2">{sku.name}</h2>
          {#if product?.serialNumber}
            <div class="font-light">#{product.serialNumber}</div>
          {/if}
        </div>
      </header>
      <div class="flex flex-row items-center space-x-2 font-normal text-base">
        {#if currency === 'USD'}
          <Icon path={hedera} size="1em" tooltip="HTS NFT minted on Hedera" class="inline align-baseline" />
        {:else if currency === 'ETH'}
          <Icon path={ethereum} size="1em" tooltip="ERC721 NFT minted on Ethereum" class="inline align-baseline" />
        {/if}
        <SkuEdition {sku} {product} />
      </div>
    </div>
    <div
      class="mt-5 mx-6 pt-4 flex flex-row items-center border-current border-solid border-t text-lg"
      aria-label="Product details"
    >
      <SkuStatus {sku} {product} />
      <span class="item-link ml-auto">
        <Icon path={arrowRightCircle} size={1.5} color="var(--sku-item-color, var(--default-color))" />
      </span>
    </div>
  </a>
</article>

<style>
  article {
    color: var(--sku-item-color, var(--default-color));
    background-color: var(--sku-item-bg-color);
    border: var(--sku-item-border-width, 1px) solid var(--sku-item-border-color, var(--default-color));
    border-radius: var(--sku-item-border-radius, 0);
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
