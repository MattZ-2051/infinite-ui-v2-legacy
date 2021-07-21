<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import CollectorItemStatus from './CollectorItemStatus.svelte';

  export let collector: CollectorProduct;
  export let redeemable: boolean;
</script>

<a href="/product/{collector._id}" class="group-hover:text-white">
  <div class="group flex flex-wrap justify-end items-center gap-1 border-b border-gray-500 hover:border-white py-4">
    <div class="flex flex-col gap-1 mr-auto">
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
    <div class="flex items-center">
      <CollectorItemStatus {collector} />
      <Icon path={mdiChevronRight} color="gray" size="1.5" />
    </div>
  </div>
</a>
