<script lang="ts">
  import ProductSummary from '$lib/product/ProductSummary.svelte';
  import ProductDetails from '$lib/product/ProductDetails.svelte';
</script>

<div class="bg-gray-900">
  <div class="container py-0">
    <div class="flex flex-col flex-auto lg:flex-row">
      <div class="lg:max-w-md">
        <ProductDetails />
      </div>
      <div class="flex-grow pt-6 px-6 pb-16 lg:pl-16 lg:pr-0 lg:pb-0">
        <ProductSummary />
      </div>
    </div>
  </div>
</div>
