<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import routes from '$project/routes';
  import { skuStatus } from '$lib/sku-item/status';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

  export let sku: Sku;
  $: status = skuStatus(sku).status;
  $: href = routes.sku(sku._id);
</script>

<div class="flex flex-col gap-4">
  <div class="relative">
    <a sveltekit:prefetch {href}>
      <FilePreview item={sku.nftPublicAssets?.[0]} preview />
      <span class="sr-only">{sku.name}</span>
    </a>
    <div
      class="hidden md:block bg-white-opacity-75 absolute inset-0 p-3 opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
      <div class="card-description-inner p-4 text-white flex">
        <div class="scrollbox">
          <div class="flex flex-col justify-between w-full">
            <div>
              <div class="flex gap-1 items-center justify-between mb-2.5">
                <a {href} class="text-primary text-2xl font-medium truncate section-title">{sku.name}</a>
                <SkuEdition {sku} />
              </div>
              <TalentLink profile={sku.issuer} class="text-lg mb-2.5" style="color: #717171" />

              {#if status === 'active'}
                <div class="flex items-center gap-4 my-4" style="color: #636363">
                  <div class="font-bold">Starting Price:</div>
                  <div>{formatCurrencyWithOptionalFractionDigits(sku.minPrice)}</div>
                </div>
              {/if}

              {#if sku.series?.name}
                <div class="mt-4 md:mt-8" style="color: #636363">Series #{sku.series.name}</div>
              {/if}

              <div class="flex-1 overflow-hidden mb-2.5 text-black-opacity-70">
                {sku.descriptionShort || ''}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="flex items-center gap-2 font-medium text-lg">
                {#if sku.redeemable}<IconRedeem size={32} />{/if}
              </div>
              <a {href} class="text-primary text-lg font-medium"
                >Learn more <span class="sr-only">for {sku.name}</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex gap-4">
    <a {href}>{sku.name}</a>
    {#if sku.redeemable}<IconRedeem />{/if}
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
