<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiChevronRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import routes from '$lib/routes';
  import UserLink from '$lib/components/UserLink.svelte';
  import CollectorItemStatus from './CollectorItemStatus.svelte';

  export let collector: CollectorProduct;
  export let redeemable: boolean;
</script>

<a href={routes.product(collector._id)}>
  <div class="flex flex-wrap justify-end items-center gap-1 border-b border-white-opacity-10 py-4">
    <div class="flex flex-col gap-1 mr-auto">
      <div class="flex items-center gap-3 " />
      <UserLink username={collector.owner?.username} />
    </div>

    <div class="flex items-center gap-6">
      <div class="flex flex-col gap-1 text-right">
        <div>
          <span class="text-white font-normal mr-2">#{collector.serialNumber}</span>
          {#if redeemable}
            <IconRedeem disabled={collector.redeemedStatus === 'redeemed'} />
          {/if}
        </div>
        <CollectorItemStatus {collector} />
      </div>

      <div class="flex items-center justify-center">
        <a href={routes.product(collector._id)}>
          <Icon path={mdiChevronRight} class="justify-self-center" />
        </a>
      </div>
    </div>
  </div></a
>
