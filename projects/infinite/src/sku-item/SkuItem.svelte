<script lang="ts">
  /* TODO:
  - Add to layout: Rarity, active listing data, series name
  - Add style rules: Sku description
  */
  import { mdiArrowRightCircle } from '@mdi/js';

  import type { Sku } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import Icon from '$ui/icon/Icon.svelte';

  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$lib/routes';

  import SkuDescription from './SkuDescription.svelte';
  import SkuEdition from './SkuEdition.svelte';
  import SkuStatus from './SkuStatus.svelte';

  export let item: Sku;
  export let type: 'sku' | 'product';

  // $: activeListing = type === 'sku' ? item.activeSkuListings?.[0] : item.activeProductListings?.[0];
</script>

<article id={item._id} class="border-2 border-current border-solid space-y-4 py-6">
  <figure class="relative mx-6 mb-0">
    <FilePreview item={item.nftPublicAssets?.[0]} preview />
    {#if item.description}
      <figcaption class="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity">
        <SkuDescription issuer={item.issuer} description={item.description} />
      </figcaption>
    {/if}
  </figure>
  <div class="info mx-6 space-y-4">
    <section class="text-current flex flex-row items-center">
      <TalentLink profile={item.issuer} hideImage class="opacity-50" />
      {#if item.redeemable}
        <div class="flex flex-row flex-nowrap items-center space-x-2 ml-auto opacity-70">
          <IconRedeem size={24} /><span>Redeemable</span>
        </div>
      {/if}
    </section>
    <header>
      <h2 class="text-2xl line-clamp-2">{item.name}</h2>
    </header>
    <SkuEdition {item} />
  </div>
  <div class="mt-5 mx-6 pt-4 flex flex-row items-center border-current border-solid border-t-2 text-lg">
    {#if type === 'sku'}
      <SkuStatus {item} />
    {/if}
    <a sveltekit:prefetch href={routes.sku(item._id)} class="ml-auto" aria-label="Product details">
      <Icon path={mdiArrowRightCircle} size={1.5} />
    </a>
  </div>
</article>

<style>
  .info {
    min-height: 9.5rem;
  }
</style>
