<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Product, Transaction } from '$lib/sku-item/types';
  import { loadProduct } from '$lib/features/product/product.api';
  import ProductPage from '$lib/features/product/Product.svelte';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    return {
      props: await loadProduct({ id, fetch }),
    };
  }
</script>

<script lang="ts">
  export let product: Product;
  export let transactions: Transaction[];
</script>

<ProductPage {product} {transactions} />
