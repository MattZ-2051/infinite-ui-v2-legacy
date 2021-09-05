<script lang="ts">
  import { userId } from '$lib/user';
  import routes from '$lib/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import ProductTabs from './ProductTabs.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import ProductStatusButton from './ProductStatusButton.svelte';
  import ProductActions from './actions/ProductActions.svelte';
  import { product, totalBids } from './product.store';
</script>

<StickyColumn reverse>
  <Gallery slot="sticky-content" items={$product.sku.nftPublicAssets} />
  <div slot="onscreen-content">
    <div class="pl-8 mt-8 md:mt-10">
      <div class="flex items-center text-4xl font-medium">
        <a sveltekit:prefetch href={routes.sku($product.sku._id)} class="text-gradient-primary">{$product.sku.name}</a>
        <span class="mx-3 text-white-opacity-30">/</span>
        <span class="text-gradient-primary">#{$product.serialNumber}</span>
      </div>

      <div class="mt-6">
        <ProductInfo product={$product} />
      </div>
      <ProductActions product={$product} userId={$userId} totalBids={$totalBids} />
    </div>

    <div class="mt-12 pl-8">
      <!-- this will be moved to the sticky footer-->
      <ProductStatusButton product={$product} />

      <ProductTabs product={$product} />
    </div>
  </div>
</StickyColumn>
