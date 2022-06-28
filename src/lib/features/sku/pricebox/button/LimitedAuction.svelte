<script lang="ts">
  import type { CollectorProductV2 } from '$lib/infinite-api-sdk/types';
  import routes from '$project/routes';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  export let collector: CollectorProductV2;
</script>

<SkuPriceBoxButton href={routes.product(collector?.listing?.product)}>
  <div class="flex justify-between">
    <div>
      <div class="flex flex-grow items-baseline">
        <div class="text-base">#{collector?.serialNumber}</div>
        <div class="text-base text-gray-500 pl-2">/</div>
        <div class="flex-col pl-2">
          <div class="text-base text-gray-500">Owner</div>
          <div class="text-sm">@{collector?.owner?.username}</div>
        </div>
      </div>
    </div>
  </div>
</SkuPriceBoxButton>
