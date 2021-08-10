<script lang="ts">
  import SkuDetails from '$lib/sku-item/SkuDetails.svelte';
  import ProductSummary from './ProductSummary.svelte';
  import { product } from './product.store';
</script>

<div class="flex flex-grow">
  <div class="flex container py-0">
    <div class="flex flex-col flex-auto lg:flex-row">
      <div class="lg:max-w-md -container-x lg:-container-none">
        <SkuDetails product={$product} />
      </div>
      <div class="flex-grow pt-6 pl-0 pb-16 lg:pl-16 lg:pb-0">
        <ProductSummary product={$product} />
      </div>
    </div>
  </div>
</div>
