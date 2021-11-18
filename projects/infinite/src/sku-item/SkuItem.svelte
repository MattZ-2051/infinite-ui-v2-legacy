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

  $: sku = product ? product.sku : _sku;
  $: activeListing = product ? product.activeProductListings?.[0] : sku.activeSkuListings?.[0];
  $: href = product ? routes.product(product._id) : routes.sku(sku._id);
  $: currency = product ? product.sku.currency : sku.currency;
</script>

<article id={sku._id} class="space-y-4 py-6" in:fade={{ duration: 300 }}>
  <a sveltekit:prefetch {href} class="space-y-4 py-6">
    <figure class="relative mx-6 mb-0">
      <FilePreview item={sku.nftPublicAssets?.[0]} preview />
      {#if activeListing?.endDate}
        <figcaption
          class="absolute bottom-4 left-4 px-4 py-2 space-x-1 text-base font-bold rounded-md"
          style="background-color: var(--sku-item-bg-color); color: var(--default-color)"
        >
          <span class="opacity-50">Ends</span>
          <span>{formatDate(activeListing.endDate)}</span>
        </figcaption>
      {/if}
    </figure>
    <div class="info mx-6 space-y-4">
      <section class="text-gray-800 flex flex-row items-center flex-wrap justify-between">
        <TalentLink profile={sku.issuer} hideImage />
        {#if sku.redeemable}
          <div class="flex flex-row items-center space-x-2">
            <IconRedeem size={24}>Redeemable</IconRedeem>
          </div>
        {/if}
      </section>
      <header>
        <div class="mb-4 flex text-2xl items-center gap-2 justify-between">
          <h2 class="line-clamp-2">{sku.name}</h2>
          {#if product?.serialNumber}
            <div>#{product.serialNumber}</div>
          {/if}
        </div>
      </header>
      <div class="flex flex-row items-center space-x-2">
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
</style>
