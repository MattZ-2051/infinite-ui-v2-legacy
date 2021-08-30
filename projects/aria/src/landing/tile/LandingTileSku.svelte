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
    <div class="card-description absolute inset-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
      <div class="card-description-inner py-10 px-8 text-white h-full flex">
        <div class="flex flex-col justify-between w-full">
          <div>
            <div class="flex items-center justify-between mb-4">
              <a href={routes.sku(sku._id)} class="text-primary text-2xl font-medium">{sku.name}</a>
              <SkuEdition item={sku} />
            </div>
            <TalentLink profile={sku.issuer} class="text-xl mb-4" style="color: #717171" />

            {#if status === 'active'}
              <div class="flex items-center gap-4 my-8" style="color: #636363">
                <div class="font-bold">Starting Price:</div>
                <div>{formatCurrencyWithOptionalFractionDigits(sku.minPrice)}</div>
              </div>
            {/if}

            {#if sku.series?.name}
              <div class="mt-6" style="color: #636363">Series #{sku.series.name}</div>
            {/if}

            <div class="flex-1 overflow-hidden mb-4">
              <div
                class="card-description-text line-clamp-4 sm:line-clamp-9 md:line-clamp-9 lg:line-clamp-6 xl:line-clamp-5 2xl:line-clamp-9"
              >
                <!-- {sku.description} -->
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi magni ipsam cumque atque culpa, unde
                sit recusandae, molestias, corporis illum temporibus praesentium quo id nesciunt voluptatibus corrupti necessitatibus
                reiciendis itaque.
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center gap-2 font-medium text-lg">
              {#if sku.redeemable}<IconRedeem size={32} /><span>Redeemable</span>{/if}
            </div>
            <a href={routes.sku(sku._id)} class="text-primary text-lg">Learn more</a>
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
  .card-description {
    background: rgba(255, 255, 255, 0.75);
  }
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
