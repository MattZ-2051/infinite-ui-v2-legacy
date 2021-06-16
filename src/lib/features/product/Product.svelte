<script lang="ts">
  import type { Transaction, Product } from '$lib/sku-item/types';
  import ProductSummary from './ProductSummary.svelte';
  import ProductDetails from './ProductDetails.svelte';

  export let product: Product;
  export let transactions: Transaction[];
</script>

<div class="bg-gray-900">
  <div class="container py-0">
    <div class="flex flex-col flex-auto lg:flex-row">
      <div class="lg:max-w-md -container-x lg:-container-none">
        <ProductDetails {product} />
      </div>
      <div class="flex-grow pt-6 pl-0 pb-16 lg:pl-16 lg:pb-0">
        <ProductSummary {product} {transactions} />
      </div>
    </div>
  </div>
</div>
