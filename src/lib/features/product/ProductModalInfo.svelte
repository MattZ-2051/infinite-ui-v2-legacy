<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';

  export let sku: Sku;
</script>

<div class="flex flex-col border border-gray-300 rounded-md">
  <div class="grid grid-cols-2 border-b border-gray-300 p-4 gap-4">
    <div class="flex flex-col gap-2 ">
      <span class="text-sm text-gray-400">Name</span>
      <span>{sku.name}</span>
    </div>
    <div class="flex flex-col gap-2  items-end">
      <span class="text-sm text-gray-400">Edition</span>
      <SkuEdition item={sku} />
    </div>
  </div>
  <div class="grid grid-cols-2 p-4 gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Created by</span>
      <TalentLink profile={sku.issuer} />
    </div>
    {#if sku.redeemable}
      <div class="flex flex-col gap-2 items-end">
        <span class="text-sm text-gray-400">Status</span>
        <div class="flex gap-2 items-center">
          <IconRedeem size={18} hasTooltip={false} /> Redeemable
        </div>
      </div>
    {/if}
  </div>
</div>
