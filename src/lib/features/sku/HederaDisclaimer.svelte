<script lang="ts">
  import arrowRight from '$lib/features/sku/assets/arrow-right';
  import { CLIENT_COMPANY_NAME, CLIENT_HEDERA_URL, ENABLE_ETH_CURRENCY } from '$project/variables';
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';
</script>

<div class="w-full">
  <div class="separator" />
  <div class="flex py-5 justify-between gap-2 items-center text-sm">
    <div class="flex gap-4 items-center">
      <div class="rounded-full bg-default p-3">
        <Icon path={hedera} size="0.75" color="var(--bg-color)" />
      </div>
      {#if ENABLE_ETH_CURRENCY}
        <span class="text-default">This {CLIENT_COMPANY_NAME} NFT is minted on the Hedera Hashgraph</span>
      {:else}
        <span class="text-default">{CLIENT_COMPANY_NAME} NFTs are minted on the Hedera Hashgraph</span>
      {/if}
    </div>
    <div class="flex flex-col sm:flex-row gap-2 items-center">
      <a href={CLIENT_HEDERA_URL} target="_blank" rel="noreferrer" class="link text-primary text-base whitespace-nowrap"
        >Read more <span class="sr-only">for Hedera hashgraph</span>
      </a>
      <span class="p-px" style="background-color: var(--button-brand-bg-color); color: var(--button-brand-color);">
        <Icon path={arrowRight} size="0.9" color="var(--button-brand-color)" />
      </span>
    </div>
  </div>
  <div class="separator" />
</div>
