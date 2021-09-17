<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Sku, Product } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';
  import SkuDescription from '$project/sku-item/SkuDescription.svelte';
  import routes from '$project/routes';
  import { formatDate } from '$util/format';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';

  let _sku: Sku = undefined;
  export { _sku as sku };
  export let product: Product = undefined;

  let clientWidth: number;
  let clientHeight: number;
  $: sku = product ? product.sku : _sku;
  $: totalSupply = product ? product.totalSupply : _sku.totalSupply;
  $: activeListing = product ? sku.activeProductListings?.[0] : sku.activeSkuListings?.[0];
  $: href = product ? routes.product(product._id) : routes.sku(sku._id);
</script>

<div class="relative flex flex-col" in:fade={{ duration: 300 }}>
  <div bind:clientWidth bind:clientHeight class="card flex flex-col h-full tracking-tighter relative z-30 mb-5">
    <div class="card-img p-2">
      <div class="relative h-full">
        <a sveltekit:prefetch {href}>
          <FilePreview item={sku.nftPublicAssets?.[0]} preview />
        </a>
        {#if activeListing?.endDate}
          <div class="card-end-label opacity-90 text-base font-medium absolute bottom-4 left-4 py-2 px-4 rounded-md">
            <div class="flex gap-1" style="position: relative; top: 1px">
              <span class="opacity-50">Ends</span>
              {formatDate(activeListing.endDate)}
            </div>
          </div>
        {/if}
        {#if sku.description}
          <SkuDescription issuer={sku.issuer} {sku} />
        {/if}
      </div>
    </div>
    <a sveltekit:prefetch {href} class="flex flex-grow">
      <div class="px-6 pt-2 pb-10 rounded-b-3xl flex flex-col flex-grow justify-between">
        <div>
          <div class="flex flex-wrap justify-between card-name">
            <TalentLink profile={sku.issuer} hideImage />
            <SkuEdition {sku} {product} />
          </div>
          <div class="mt-5 mb-10 flex justify-between items-start gap-2">
            <span class="text-2.5xl font-light">{sku.name}</span>
            {#if sku.redeemable}
              <IconRedeem size={32} />
            {/if}
          </div>
        </div>
        <div class="mb-4 flex items-center gap-2 justify-between">
          {#if sku.series}
            <div>{sku.series.name}</div>
          {/if}
          {#if product?.serialNumber}
            <div>#{product.serialNumber}</div>
          {/if}
        </div>
      </div>
      <div class="absolute bottom-0 transform translate-y-5 left-2 right-2">
        <SkuStatus {sku} {product} />
      </div>
    </a>
  </div>

  {#if totalSupply > 1}
    <div
      style="width: {clientWidth}px; height: {clientHeight}px"
      class="card card-1 absolute transform translate-x-2 translate-y-2 z-20"
    />
    <div
      style="width: {clientWidth}px; height: {clientHeight}px"
      class="card card-2 absolute transform translate-x-3.5 translate-y-4 z-10"
    />
  {/if}
</div>

<style lang="postcss">
  .card {
    @apply border border-transparent bg-origin-border;
    border-bottom-left-radius: 3.75rem;
    border-bottom-right-radius: 3.75rem;
    background: linear-gradient(#000000, #000000) padding-box,
      linear-gradient(var(--gradient-start) 0%, var(--gradient-end) 100%) border-box;
  }
  .card-1 {
    border-bottom-left-radius: 4rem;
    border-bottom-right-radius: 4rem;
  }
  .card-2 {
    border-bottom-left-radius: 6rem;
    border-bottom-right-radius: 4.25rem;
  }
  .card-name {
    color: #9e9e9e;
  }
  .card-img {
    aspect-ratio: 1 / 1;
  }
  .card-end-label {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#000000, #000000) padding-box,
      linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-end) 100%) border-box;
  }
</style>
