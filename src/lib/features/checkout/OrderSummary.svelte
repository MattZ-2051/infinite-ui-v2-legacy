<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import type { Sku, Product, Listing } from '$lib/sku-item/types';
  import type { ActiveType } from '$ui/accordion/AccordionGroup.svelte';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import { FilePreview } from '$ui/file';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import OrderProductPricing from '$lib/features/order/OrderProductPricing.svelte';
  import { getBuyingFee, getSkuBuyingFee } from '$lib/features/product/product.fee';
  import { media } from '$lib/media-query.store';
  import Icon from '$ui/icon/Icon.svelte';

  let active: ActiveType = [];
  active.push('summary');

  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let listing: Listing;
  export let rate: number = undefined;
  export let gasFee = 0;
  export let closeIcon: () => void;

  const _sku = product ? product.sku : sku;
  const listingPrice = listing?.saleType === 'giveaway' ? 0 : listing?.price;
  const marketplaceFee = product ? getBuyingFee(product) : getSkuBuyingFee(sku);
</script>

<article class="py-6 mx-auto max-w-xl xl:max-w-sm">
  {#if $media.xl}
    <header><h3 class="text-2xl">Order Summary</h3></header>
    <figure class="m-10">
      <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
    </figure>
    <section>
      <ProductModalInfo sku={_sku} />
    </section>
    <section class="mt-4 pt-6">
      <OrderProductPricing price={listingPrice} {marketplaceFee} currency={_sku.currency} {rate} {gasFee} />
    </section>
  {:else}
    <span on:click={closeIcon} class="absolute close-icon"><Icon path={mdiClose} size={1.5} /></span>
    <AccordionGroup multiple bind:active>
      <Accordion titleClass="align-center w-56 py-6 text-2xl header-title" title="Order Summary" id="summary">
        <figure class="m-10">
          <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
        </figure>
        <section>
          <ProductModalInfo sku={_sku} />
        </section>
      </Accordion>
    </AccordionGroup>
    <section class="mt-4 pt-6">
      <OrderProductPricing price={listingPrice} {marketplaceFee} currency={_sku.currency} {rate} {gasFee} />
    </section>
  {/if}
</article>

<style lang="postcss">
  :global(.expanded) {
    --accordion-title-color: var(--primary-color);
  }

  .close-icon {
    left: 80%;
    top: 4rem;
    cursor: pointer;
  }
</style>
