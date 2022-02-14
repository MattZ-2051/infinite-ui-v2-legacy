<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import routes from '$project/routes';
  import arrowLeft from '$lib/features/product/assets/arrow-left';
  import { browser } from '$app/env';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import CollectorsSummary from './CollectorsSummary.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let page: number;
  export let search: string;
  export let total: number;
  export let perPage: number;

  const hasCloseButton = browser && history.length > 1;

  function onClose() {
    history.back();
  }
</script>

<div class="collectors-content">
  <StickyColumn reverse>
    <div slot="sticky-content" class="sticky-content">
      <Gallery items={sku.nftPublicAssets} />
    </div>
    <div slot="onscreen-content">
      <div class="px-4 md:px-8 md:pl-8 pt-8 md:pt-10">
        <div class="flex justify-between items-center">
          <div class="flex flex-wrap text-3xl md:text-4xl gap-2 md:gap-0 font-medium">
            <a sveltekit:prefetch href={routes.sku(sku._id)} class="text-gradient-primary collectors-title"
              >{sku.name}</a
            >
            <div class="flex items-center">
              <span class="mx-3 text-gray-300">/</span>
              <span class="text-gradient-primary collectors-title">Collectors</span>
            </div>
          </div>
          {#if hasCloseButton}
            <button type="button" on:click={onClose} class="close rounded-full bg-gray-100 text-white">
              <Icon
                path={arrowLeft}
                size="1.75"
                class="transform scale-90 sm:scale-100 md:scale-110 p-1 rounded-full"
              />
              <span class="sr-only">Back</span>
            </button>
          {/if}
        </div>
      </div>

      <div class="mt-20">
        <CollectorsSummary {sku} {collectors} {page} {search} {total} {perPage} />
      </div>
    </div>
  </StickyColumn>
</div>

<style lang="postcss">
  .sticky-content {
    height: 60vh;
  }
  @screen md {
    .sticky-content {
      height: inherit;
    }
  }
  .collectors-content {
    --sticky-scroll-bg: var(--collectors-content-bg);
  }
  .close:hover {
    color: var(--button-brand-color-hover);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }

  .collectors-title {
    font-family: var(--collectors-title-font);
  }
</style>
