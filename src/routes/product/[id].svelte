<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Product, Transaction } from '$lib/sku-item/types';
  import { loadProduct, loadProductTransactions } from '$lib/features/product/product.api';
  import ProductPage from '$lib/features/product/Product.svelte';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    const [product, transactions] = await Promise.all([
      loadProduct({ id, fetch }),
      loadProductTransactions({ id, fetch }),
    ]);
    return {
      props: { product, transactions },
    };
  }
</script>

<script lang="ts">
  export let product: Product;
  export let transactions: Transaction[];
</script>

<ProductPage {product} {transactions} />
