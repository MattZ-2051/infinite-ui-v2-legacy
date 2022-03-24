<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import notRedeemable from '$lib/components/icons/not-redeemable';
  import Icon from '$ui/icon/Icon.svelte';

  export let sku: Sku = undefined;
  export let product: Product = undefined;
</script>

<div class="flex flex-col border border-gray-100 rounded-xl w-full">
  <div class="grid grid-cols-2 border-b border-gray-100 p-4 gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-500">Item Name</span>
      <div class="flex items-center gap-2">
        <div>{product?.name || sku.name}</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 items-end">
      <span class="text-sm text-gray-500">Edition</span>
      {#if product?.serialNumber}
        <div>#{product.serialNumber}</div>
      {/if}
      <SkuEdition {sku} {product} />
    </div>
  </div>
  <div class="flex p-4 gap-4">
    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <span class="text-sm text-gray-500">Created by</span>
      <TalentLink profile={sku.issuer} />
    </div>
    {#if sku.redeemable}
      <div class="flex flex-col gap-2 items-end flex-1">
        <span class="text-sm text-gray-500">Redemption Status</span>
        <IconRedeem size={18}>{product?.redeemedStatus !== 'redeemed' ? 'Redeemable' : 'Redeemed'}</IconRedeem>
      </div>
    {:else}
      <div class="flex flex-col gap-2 items-end flex-1" style="display:var(--redemption-status-display, none);">
        <div class="text-gray-500 text-sm">Redemption Status</div>
        <div class="flex">
          <Icon path={notRedeemable} /><span>Not Redeemable</span>
        </div>
      </div>
    {/if}
  </div>
</div>
