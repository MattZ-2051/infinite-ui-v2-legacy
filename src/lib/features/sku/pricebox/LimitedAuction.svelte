<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import { mdiArrowRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import routes from '$lib/routes';

  export let collector: CollectorProduct;
</script>

<div class="gap-8 px-8 py-5 bg-white font-normal text-black">
  <div class="flex justify-between">
    <div>
      <div class=" flex flex-grow items-baseline">
        <div class="text-base">#{collector?.serialNumber}</div>
        <div class="text-base text-black-opacity-50 pl-2">/</div>
        <div class="flex-col pl-2">
          <div class="text-base text-black-opacity-50">Owner</div>
          <div class="text-black text-sm">@{collector?.owner?.username}</div>
        </div>
      </div>
    </div>
    <a href={routes.product(collector?.listing?.product)}>
      <Icon path={mdiArrowRight} size="2.0" />
    </a>
  </div>
</div>
