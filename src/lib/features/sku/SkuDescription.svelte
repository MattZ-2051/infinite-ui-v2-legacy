<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import xss from 'xss';
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';

  export let sku: Sku;
</script>

<div class="description grid grid-cols-3 gap-10">
  {@html xss(sku.description || '')}

  <div class="mt-4 flex bg-gray-100 text-gray-400 px-6 py-3 rounded-3xl justify-between items-center text-sm">
    <div class="flex items-center ">
      <div class="inline-block bg-black rounded-2xl p-2 mr-4">
        <Icon path={hedera} size="0.6" />
      </div>
      <span>{CLIENT_COMPANY_NAME} NFTs are minted on the Hedera Hashgraph</span>
    </div>
    <a href="https://support.suku.world/infinite/hedera-hashgraph-hts" class="link">Learn more</a>
  </div>
</div>

<style lang="postcss">
  .description :global(h3) {
    @apply font-bold;
    @apply text-black;
  }
  .description :global(p) {
    @apply my-4;
  }
  .description :global(ul) {
    @apply my-4;
    @apply list-disc;
    @apply pl-5;
  }
  .description :global(a) {
    @apply underline;
    @apply text-black;
  }
</style>
