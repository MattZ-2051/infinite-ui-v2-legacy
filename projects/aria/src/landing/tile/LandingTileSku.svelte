<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import routes from '$lib/routes';
  import { skuStatus } from '$lib/sku-item/status';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

  export let sku: Sku;
  $: status = skuStatus(sku);
</script>

<div class="flex flex-col gap-4">
  <div class="relative">
    <FilePreview item={sku.nftPublicAssets?.[0]} preview />
    <div class="bg-white-opacity-75 absolute inset-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
      <div class="card-description-inner p-4 lg:py-10 lg:px-8 text-white h-full flex">
        <div class="scrollbox">
          <div class="flex flex-col justify-between w-full h-full">
            <div>
              <div class="flex flex-wrap items-center justify-between mb-4">
                <a href={routes.sku(sku._id)} class="text-primary text-2xl font-medium">{sku.name}</a>
                <SkuEdition item={sku} />
              </div>
              <TalentLink profile={sku.issuer} class="text-xl mb-4" style="color: #717171" />

              {#if status === 'active'}
                <div class="flex items-center gap-4 my-4 md:my-8" style="color: #636363">
                  <div class="font-bold">Starting Price:</div>
                  <div>{formatCurrencyWithOptionalFractionDigits(sku.minPrice)}</div>
                </div>
              {/if}

              {#if sku.series?.name}
                <div class="mt-4 md:mt-8" style="color: #636363">Series #{sku.series.name}</div>
              {/if}

              <div class="flex-1 overflow-hidden mb-4">
                {sku.descriptionShort || ''}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="flex items-center gap-2 font-medium text-lg">
                {#if sku.redeemable}<IconRedeem size={32} /><span class="hidden md:block">Redeemable</span>{/if}
              </div>
              <a href={routes.sku(sku._id)} class="text-primary text-lg">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-4">
    <a href={routes.sku(sku._id)}>{sku.name}</a>
    {#if sku.redeemable}<IconRedeem />{/if}
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
