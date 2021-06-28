<script lang="ts">
  import type { Transaction, Product } from '$lib/sku-item/types';
  import SkuDetails from '$lib/sku-item/SkuDetails.svelte';
  import ProductSummary from './ProductSummary.svelte';

  export let product: Product;
  export let transactions: Transaction[];
</script>

<div class="flex bg-gray-900 flex-grow">
  <div class="flex container py-0">
    <div class="flex flex-col flex-auto lg:flex-row">
      <div class="lg:max-w-md -container-x lg:-container-none">
        <SkuDetails
          sku={{
            ...product.sku,
            ...{ totalSupply: product.totalSupply, circulatingSupply: product.circulatingSupply },
          }}
        />
      </div>
      <div class="flex-grow pt-6 pl-0 pb-16 lg:pl-16 lg:pb-0">
        <ProductSummary {product} {transactions} />
      </div>
    </div>
  </div>
</div>
