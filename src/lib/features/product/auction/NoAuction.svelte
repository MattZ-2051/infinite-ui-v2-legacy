<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import routes from '$project/routes';
  import Icon from '$ui/icon/Icon.svelte';

  export let product: Product;
</script>

<div class="h-24 rounded-xl flex justify-between items-center text-lg bg-color px-10">
  <span class="text-gray-400">No active or upcoming auction</span>
  <a href={routes.collectors(product.sku._id)} class="text-white flex items-center"
    >Find others <Icon path={mdiChevronRight} size="1.4" /></a
  >
</div>

<style>
  .bg-color {
    background: #2e2e2e;
  }
</style>
