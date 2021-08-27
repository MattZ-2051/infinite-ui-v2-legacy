<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Sku } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import SkuEdition from '$project/sku-item/SkuEdition.svelte';
  import SkuStatus from '$project/sku-item/SkuStatus.svelte';
  import SkuDescription from '$project/sku-item/SkuDescription.svelte';
  import routes from '$lib/routes';
  import { skuStatus } from '$lib/sku-item/status';
  import circleWavyCheck from '$static/circle_wavy_check.svg';
  import { formatDate } from '$util/format';

  export let item: Sku;
  export let type: 'sku' | 'product';

  let clientWidth: number;
  let clientHeight: number;
  $: activeListing = type === 'sku' ? item.activeSkuListings?.[0] : item.activeProductListings?.[0];
</script>

<div class="relative flex flex-col" in:fade={{ duration: 300 }}>
  <div bind:clientWidth bind:clientHeight class="card flex flex-col h-full tracking-tighter relative z-30 mb-11">
    <div class="card-img p-2">
      <div class="relative h-full">
        <FilePreview item={item.nftPublicAssets?.[0]} preview />
        {#if activeListing?.endDate}
          <div
            class="card-end-label opacity-90 text-base font-medium absolute bottom-4 left-4 py-2 px-4 rounded-md flex gap-2"
          >
            <span class="opacity-50">Ends</span>
            {formatDate(activeListing.endDate, 'MMM D, h:mm A')}
          </div>
        {/if}
        {#if item.description}
          <SkuDescription issuer={item.issuer} description={item.description} />
        {/if}
      </div>
    </div>
    <a sveltekit:prefetch href={routes.sku(item._id)}>
      <div class="px-6 pt-2 pb-10 rounded-b-3xl flex flex-col flex-grow justify-between">
        <div>
          <div class="flex flex-wrap justify-between">
            <div class="flex">
              <span class="card-name whitespace-nowrap">{item.issuer.username}</span>
              <img class="ml-2" src={circleWavyCheck} alt="Verified" />
            </div>
            <SkuEdition {item} />
          </div>
          <div class="mt-5 mb-2 flex justify-between items-start gap-2">
            <span class="text-2.5xl font-light card-title">{item.name}</span>
            {#if item.redeemable}
              <IconRedeem size={32} />
            {/if}
          </div>
        </div>
        {#if item.series}
          <div class="mt-8 card-series"># {item.series.name}</div>
        {/if}
      </div>
      {#if type === 'sku'}
        <div class="absolute bottom-0 transform translate-y-5 left-2 right-2">
          <SkuStatus startDate={item.minStartDate} status={skuStatus(item)} price={item.minPrice} />
        </div>
      {/if}
    </a>
  </div>

  {#if type === 'sku' && item.totalSupply > 1}
    <div
      style="width: {clientWidth}px; height: {clientHeight}px"
      class="card card-1 absolute transform translate-x-2 translate-y-2 z-20"
    />
    <div
      style="width: {clientWidth}px; height: {clientHeight}px"
      class="card card-2 absolute transform translate-x-3.5 translate-y-4 z-10"
    />
  {/if}
</div>

<style lang="postcss">
  .card {
    @apply border border-transparent bg-origin-border;
    border-bottom-left-radius: 3.75rem;
    border-bottom-right-radius: 3.75rem;
    background: linear-gradient(#000000, #000000) padding-box, linear-gradient(#c000d6 0%, #6734ff 100%) border-box;
  }
  .card-1 {
    border-bottom-left-radius: 4rem;
    border-bottom-right-radius: 4rem;
  }
  .card-2 {
    border-bottom-left-radius: 6rem;
    border-bottom-right-radius: 4.25rem;
  }
  .card-name {
    color: #9e9e9e;
  }
  .card-title {
    color: #ffffff;
  }
  .card-series {
    @apply mb-4;
    color: #ffffff;
  }
  .card-img {
    aspect-ratio: 1 / 1;
  }
  .card-img:hover {
  }

  .card-end-label {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#000000, #000000) padding-box,
      linear-gradient(90deg, #c000d6 0%, #6734ff 100%) border-box;
  }
</style>
