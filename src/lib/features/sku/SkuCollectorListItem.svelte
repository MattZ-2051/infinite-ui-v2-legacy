<script lang="ts">
  import { mdiChevronRight, mdiAccountCircle } from '@mdi/js';
  import type { CollectorProduct } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import CollectorItemStatus from '$lib/features/collectors/CollectorItemStatus.svelte';
  import imageError from '$util/imageError';
  import routes from '$lib/routes';

  export let collector: CollectorProduct;
</script>

<a href={routes.product(collector._id)} class="flex flex-wrap justify-end items-center gap-1">
  <div class="flex gap-3 mr-auto">
    {#if collector?.owner?.profilePhotoUrl}
      <img
        class="w-12 h-12 border rounded-full"
        src={collector.owner.profilePhotoUrl}
        alt=""
        use:imageError={() => (collector.owner.profilePhotoUrl = undefined)}
        loading="lazy"
      />
    {:else}
      <Icon path={mdiAccountCircle} size="2" />
    {/if}
    <div>
      <div>
        #{collector.serialNumber}
      </div>
      <div class="text-gray-400">
        {collector.owner.username}
      </div>
    </div>
  </div>
  <div class="flex items-center gap-5 justify-self-end">
    <div class="flex items-end text-gray-500 item-status">
      <CollectorItemStatus {collector} />
    </div>
    <Icon path={mdiChevronRight} color="black" class="justify-self-end" />
  </div>
</a>
<div class="w-full border-b border-gray-100" />

<style lang="postcss">
  .item-status {
    --collector-item-status-highlight: theme('colors.black');
  }
</style>
