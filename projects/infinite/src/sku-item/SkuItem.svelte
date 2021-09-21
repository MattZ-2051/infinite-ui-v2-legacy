<script lang="ts">
  import { mdiArrowRightCircle } from '@mdi/js';
  import type { Sku, Product } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';
  import SkuEdition from './SkuEdition.svelte';
  import SkuStatus from './SkuStatus.svelte';

  let _sku: Sku = undefined;
  export { _sku as sku };
  export let product: Product = undefined;

  $: sku = product ? product.sku : _sku;
</script>

<article id={sku._id} class="border border-current border-solid space-y-4 py-6">
  <figure class="relative mx-6 mb-0">
    <FilePreview item={sku.nftPublicAssets?.[0]} preview />
  </figure>
  <div class="info mx-6 space-y-4">
    <section class="text-current flex flex-row items-center">
      <TalentLink profile={sku.issuer} hideImage class="text-gray-500" />
      {#if sku.redeemable}
        <div class="flex flex-row flex-nowrap items-center space-x-2 ml-auto">
          <IconRedeem size={24} /><span class="text-gray-700">Redeemable</span>
        </div>
      {/if}
    </section>
    <header>
      <h2 class="text-2xl line-clamp-2">{sku.name}</h2>
    </header>
    <SkuEdition {sku} {product} />
  </div>
  <a
    sveltekit:prefetch
    href={routes.sku(sku._id)}
    class="mt-5 mx-6 pt-4 flex flex-row items-center border-current border-solid border-t text-lg"
    aria-label="Product details"
  >
    <SkuStatus {sku} {product} />
    <Icon class="ml-auto" path={mdiArrowRightCircle} size={1.5} />
  </a>
</article>

<style>
  article {
    color: var(--sku-item-color);
    background-color: var(--sku-item-bg-color);
  }

  .info {
    min-height: 9.5rem;
  }
</style>
