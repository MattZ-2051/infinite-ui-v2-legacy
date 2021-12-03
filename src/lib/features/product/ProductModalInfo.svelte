<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;
</script>

<div class="flex flex-col border border-gray-100 rounded-md w-full">
  <div class="grid grid-cols-2 border-b border-gray-100 p-4 gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-500">Item Name</span>
      <div class="flex items-center gap-2">
        <div>{sku.name}</div>
        {#if product?.serialNumber}
          <div>#{product.serialNumber}</div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col gap-2 items-end">
      <span class="text-sm text-gray-500">Edition</span>
      <SkuEdition {sku} {product} />
    </div>
  </div>
  <div class="flex p-4 gap-4">
    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <span class="text-sm text-gray-500">Creator</span>
      <TalentLink profile={sku.issuer} />
    </div>
    {#if sku.redeemable}
      <div class="flex flex-col gap-2 items-end flex-1">
        <span class="text-sm text-gray-500">Status</span>
        <IconRedeem size={18}>{product?.redeemedStatus !== 'redeemed' ? 'Redeemable' : 'Redeemed'}</IconRedeem>
      </div>
    {/if}
  </div>
</div>
