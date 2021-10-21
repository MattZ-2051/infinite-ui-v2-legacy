<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import { browser } from '$app/env';
  import { userId } from '$lib/user';
  import routes from '$project/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import ProductTabs from './ProductTabs.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import ProductStatus from './status/ProductStatus.svelte';
  import { product } from './product.store';

  export let tab: 'auction' | 'history' | 'owner';

  function onClose() {
    history.back();
  }
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={$product.sku.nftPublicAssets} />
  </div>
  <div class="flex flex-col md:px-0" slot="onscreen-content" style="min-height: calc(100vh - var(--header-height));">
    <div class="mx-4 md:pl-8 mt-8 md:mt-10">
      <div class="flex items-center text-4xl font-medium justify-between gap-6">
        <div class="flex items-center">
          <a sveltekit:prefetch href={routes.sku($product.sku._id)} class="text-gradient-primary">{$product.sku.name}</a
          >
          <span class="mx-3 text-gray-300">/</span>
          <span class="text-gradient-primary">#{$product.serialNumber}</span>
        </div>
        {#if browser && history.length > 1}
          <button type="button" on:click={onClose} class="rounded-full bg-white text-black">
            <Icon path={mdiClose} size="1.33" class="p-1 rounded-full" />
          </button>
        {/if}
      </div>
      <div class="mt-6">
        <ProductInfo product={$product} />
      </div>
    </div>

    <div class="mt-12 md:mx-0 flex flex-col flex-grow">
      <ProductTabs product={$product} {tab} />
    </div>

    <ProductStatus
      class="sticky md:w-full left-0 bottom-0 md:pb-4 lg:pb-12 md:px-4 lg:px-12"
      style="background-color: var(--product-tabs-bg);"
      product={$product}
      userId={$userId}
    />
  </div>
</StickyColumn>

<style lang="postcss">
  .sticky-content {
    height: 60vh;
  }
  @screen md {
    .sticky-content {
      height: 100%;
    }
  }
</style>
