<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import { formatCurrency } from '$util/format';
  import { Breadcrumb, BreadcrumbItem } from '$ui/breadcrumbs';

  export let sku: Sku;
  export let price: number = undefined;
  export let serial: string = undefined;
</script>

<div class="grid grid-cols-2 gap-1 w-full">
  <div class="font-medium text-gray-400">
    {sku.issuerName}
  </div>
  <div class="text-right font-medium">
    <Rarity rarity={sku.rarity} />
  </div>
  <div class="font-medium">
    <span class="text-xl">{sku.name}</span>
  </div>
  <div class="text-right text-2xl">
    {#if price}
      {formatCurrency(price)}
    {/if}
  </div>
  <div class="flex">
    <Breadcrumb>
      {#if sku.series?.name}
        <BreadcrumbItem class="text-gray-500 font-medium">{sku.series.name}</BreadcrumbItem>
      {/if}
      {#if sku.redeemable}
        <BreadcrumbItem>
          <IconRedeem class="text-black bg-white rounded-full mr-1 p-1 border" />
          <span>Redeemable</span>
        </BreadcrumbItem>
      {/if}
    </Breadcrumb>
  </div>
  <div class="text-right">
    {#if serial}
      <span class="font-bold italic text-gray-500">Serial:</span>
      <span class="font-bold">#{serial}</span>
    {/if}
  </div>
</div>
