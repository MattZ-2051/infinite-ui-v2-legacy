<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import OrderSummary from './OrderSummary.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);
</script>

<div class="container grid grid-cols-2">
  <OrderSummary {sku} {product} {listing} />
</div>
