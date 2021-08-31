<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { mdiBellOutline as notifyIcon, mdiShareVariant as shareIcon } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import { notifyAction } from '$lib/notify';
  import { socialShareAction } from '$lib/social';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';

  export let sku: Sku;
</script>

<div class="border border-white border-opacity-20 rounded-lg text-white overflow-hidden">
  <div class="p-6 border-b border-opacity-20 border-white flex justify-between">
    <div class="flex flex-col gap-2">
      <div class="text-white-opacity-50 text-sm">Edition</div>
      <div><SkuEdition item={sku} /></div>
    </div>
    <div class="flex flex-col gap-2 text-right">
      <div class="text-white-opacity-50 text-sm">Active Auction</div>
      <div>Ends Aug 5th at 12:00 PM PDT</div>
    </div>
  </div>
  <div class="p-6 border-b border-opacity-20 flex justify-between">
    <div class="flex flex-col gap-2">
      <div class="text-white-opacity-50 text-sm">Created by</div>
      <TalentLink profile={sku.issuer} />
    </div>
    <div class="flex flex-col gap-2 text-right">
      {#if sku.redeemable}
        <div class="text-white-opacity-50 text-sm">Status</div>
        <div class="flex items-center gap-2">
          <IconRedeem hasTooltip={false} /> Redeemable
        </div>
      {/if}
    </div>
  </div>
  <div class="grid grid-cols-2">
    <div class="border-r border-opacity-20">
      <button
        type="button"
        class="flex items-center justify-center gap-2 hover:bg-primary text-center px-2 py-5 w-full h-full"
        use:notifyAction={{ profile: sku.issuer }}><Icon path={notifyIcon} />Notify Me</button
      >
    </div>
    <div class="border-r border-opacity-20">
      <button
        type="button"
        class="flex items-center justify-center gap-2 hover:bg-primary text-center px-2 py-5 w-full h-full"
        use:socialShareAction={{ sku }}><Icon path={shareIcon} />Share</button
      >
    </div>
  </div>
</div>
