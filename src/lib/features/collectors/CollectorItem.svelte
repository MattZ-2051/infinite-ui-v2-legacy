<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiAccountCircle } from '@mdi/js';
  import mdiChevronRight from '$lib/components/icons/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import imageError from '$util/imageError';
  import routes from '$project/routes';
  import UserLink from '$lib/components/UserLink.svelte';
  import CollectorItemStatus from './CollectorItemStatus.svelte';

  export let collector: CollectorProduct;
  export let redeemable: boolean;
  export let currency: 'USD' | 'ETH';
</script>

<a href={routes.product(collector._id)}>
  <div
    class="flex flex-wrap justify-end items-center gap-1 border-b border-gray-100 p-4 md:px-8"
    style="background-color: var(--collector-item-bg)"
  >
    <div class="flex gap-3 md:gap-5 mr-auto">
      {#if collector?.owner?.profilePhotoUrl}
        <img
          class="w-12 h-12 rounded-full object-cover"
          src={collector.owner.profilePhotoUrl}
          alt=""
          use:imageError={() => (collector.owner.profilePhotoUrl = undefined)}
          loading="lazy"
        />
      {:else}
        <Icon path={mdiAccountCircle} size="2" />
      {/if}
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          #{collector.serialNumber}
          {#if redeemable}
            <IconRedeem disabled={collector.redeemedStatus === 'redeemed'} size={20} />
          {/if}
        </div>
        <UserLink username={collector.owner?.username} class="text-sm text-gray-400" />
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex flex-col gap-1 text-right">
        <CollectorItemStatus {collector} {currency} />
      </div>

      <Icon path={mdiChevronRight} class="justify-self-center" />
    </div>
  </div></a
>
