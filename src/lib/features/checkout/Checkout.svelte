<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';
  import { getActiveListings } from '$lib/features/sku/sku.service';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import OrderSummary from './OrderSummary.svelte';
  import ExitCheckout from './ExitCheckout.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sku = sku ? sku : product.sku;
  const [listing] = getActiveListings(sku);

  let exitCheckout = false;
</script>

<div class="container grid grid-cols-2">
  <OrderSummary {sku} {product} {listing} />
  {#if exitCheckout}
    <ExitCheckout onReturn={() => (exitCheckout = false)} onExit={() => goto(routes.sku(_sku._id))} />
  {/if}
</div>
