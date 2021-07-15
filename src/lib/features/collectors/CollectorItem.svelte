<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import CollectorItemStatus from './CollectorItemStatus.svelte';

  export let collector: CollectorProduct;
  export let redeemable: boolean;
</script>

<a href="/product/{collector._id}" class="self-end group-hover:text-white">
  <div
    class="grid-container group grid gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
  >
    <div>
      <div class="flex items-center gap-3 ">
        <span class="text-white font-normal">#{collector.serialNumber}</span>
        {#if redeemable}
          <IconRedeem
            class="text-black {collector.redeemedStatus === 'redeemed' ? 'bg-gray-800' : 'bg-white'} rounded-full p-1"
            tooltip={{
              content: collector.redeemedStatus === 'redeemed' ? 'Redeemed' : 'Redeemable',
              theme: 'white',
            }}
          />
        {/if}
      </div>
      <span class="italic font-black">@{collector.owner?.username}</span>
    </div>
    <div class="justify-self-end">
      <CollectorItemStatus {collector} />
    </div>
    <Icon path={mdiChevronRight} color="gray" size="1.5" class="justify-self-end" />
  </div>
</a>

<style>
  .grid-container {
    grid-template-columns: auto auto 35px;
  }
</style>
