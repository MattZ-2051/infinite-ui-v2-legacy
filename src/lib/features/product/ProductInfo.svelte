<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';

  export let product: Product;

  let sku: Sku;
  $: sku = product.sku;

  const cellClass = 'flex flex-col gap-1.5 py-4 px-6 ';
  const borderClass = 'border-l border-t border-b border-white border-opacity-20';
  const headerClass = 'text-white-opacity-50 text-sm';
</script>

<div class="rounded-lg text-white overflow-hidden grid grid-flow-col">
  <div class="{cellClass} {borderClass} rounded-l-lg">
    <div class={headerClass}>Owner</div>
    <div><UserLink username={product.owner.username} /></div>
  </div>
  <div class="{cellClass} {borderClass}">
    <div class={headerClass}>Status</div>
    <div class="flex gap-2">
      {#if sku.redeemable || true}
        <IconRedeem />
        <span>Redeemable</span>
      {/if}
    </div>
  </div>
  <div class="{cellClass} {borderClass}">
    <div class={headerClass}>Created by</div>
    <div><TalentLink profile={sku.issuer} /></div>
  </div>
  <div class="{cellClass} {borderClass}">
    <div class={headerClass}>Hedera Token</div>
    <div><a class="link" href={product.explorerLink}>{product.tokenId}</a></div>
  </div>
  <div class={cellClass} style="background-color: #191919">
    <div class={headerClass}>Auction ends in:</div>
    <div>5h 40m - Sept 2nd at 1:00 PM</div>
  </div>
</div>
