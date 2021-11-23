<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import information from '$lib/components/icons/information';
  import Icon from '$ui/icon/Icon.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';

  export let sku: Sku;

  const cellClass = 'flex flex-col gap-1.5 py-4 px-6 overflow-hidden';
  const headerClass = 'text-gray-500 text-sm';
</script>

<div
  class="rounded-lg border border-gray-200 text-white overflow-hidden grid grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:divide-x lg:divide-gray-200 flex-grow"
>
  <div class={cellClass}>
    <div class={headerClass}>Status</div>
    <SkuStatus {sku} product={undefined} forProductStatus />
  </div>
  {#if sku.redeemable}
    <div class={cellClass}>
      <div class={headerClass}>Redemption Status</div>
      <div class="flex gap-2">
        <IconRedeem>Redeemable</IconRedeem>
      </div>
    </div>
  {/if}
  <div class={cellClass}>
    <div class={`${headerClass} flex justify-between`}>
      Created by
      <div class="rounded-full text-white bg-gray-100 w-min p-1 hover:bg-gray-300 cursor-pointer">
        <Icon
          path={information}
          size="0.9em"
          tooltip="User who issued the NFT and who was who created the assets for this NFT."
        />
      </div>
    </div>
    <div><TalentLink profile={sku.issuer} /></div>
  </div>
  <div class={cellClass}>
    <div class={headerClass}>ERC721 Contract</div>
    <div class="flex flex-row items-center">
      <div class="truncate flex-1">
        <a class="link" href="https://testnets.opensea.io/collection/seva-nft" target="_blank" rel="noopener noreferrer"
          >seva-nft</a
        >
      </div>
    </div>
  </div>
</div>
