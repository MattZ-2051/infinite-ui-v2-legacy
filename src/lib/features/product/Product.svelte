<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import { userId } from '$lib/user';
  import routes from '$lib/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import ProductTabs from './ProductTabs.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import ProductStatus from './status/ProductStatus.svelte';
  import { product, totalBids } from './product.store';
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={$product.sku.nftPublicAssets} />
  </div>
  <div class="flex flex-col" slot="onscreen-content" style="min-height: calc(100vh - var(--header-height));">
    <div class="md:pl-8 mt-8 md:mt-10">
      <div class="flex items-center text-4xl font-medium justify-between">
        <div class="flex items-center">
          <a sveltekit:prefetch href={routes.sku($product.sku._id)} class="text-gradient-primary">{$product.sku.name}</a
          >
          <span class="mx-3 text-white-opacity-30">/</span>
          <span class="text-gradient-primary">#{$product.serialNumber}</span>
        </div>
        <a sveltekit:prefetch href={routes.sku($product.sku._id)} class="rounded-full bg-white text-black">
          <Icon path={mdiClose} size="1.33" class="p-1 rounded-full" />
        </a>
      </div>

      <div class="mt-6">
        <ProductInfo product={$product} />
      </div>
    </div>

    <div class="mt-12 -mx-4 md:mx-0 flex flex-col flex-grow">
      <ProductTabs product={$product} userId={$userId} totalBids={$totalBids} />
    </div>

    <ProductStatus
      class="sticky w-screen md:w-full left-0 bottom-0 md:pb-4 -container-x md:-container-none md:px-12"
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
