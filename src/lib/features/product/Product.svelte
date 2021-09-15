<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import { userId } from '$lib/user';
  import routes from '$project/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import ProductTabs from './ProductTabs.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import ProductStatus from './status/ProductStatus.svelte';
  import { product } from './product.store';
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={$product.sku.nftPublicAssets} />
  </div>
  <div
    class="flex flex-col -container-x px-4 md:-container-none md:px-0"
    slot="onscreen-content"
    style="min-height: calc(100vh - var(--header-height));"
  >
    <div class="md:pl-8 mt-8 md:mt-10">
      <div class="flex items-center text-4xl font-medium justify-between">
        <div class="flex items-center">
          <a sveltekit:prefetch href={routes.sku($product.sku._id)} class="text-gradient-primary">{$product.sku.name}</a
          >
          <span class="mx-3 text-gray-300">/</span>
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
      <ProductTabs product={$product} />
    </div>

    <ProductStatus
      class="sticky md:w-full left-0 bottom-0 md:pb-4 lg:pb-12 md:px-4 lg:px-12 -container-x md:-container-none"
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
