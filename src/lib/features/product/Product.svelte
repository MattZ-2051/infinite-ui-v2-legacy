<script lang="ts">
  import arrowLeft from '$lib/features/product/assets/arrow-left';
  import shareIcon from '$lib/features/sku/assets/share';
  import { browser } from '$app/env';
  import { userId } from '$lib/user';
  import routes from '$project/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import { socialShareAction } from '$lib/social';
  import Icon from '$ui/icon/Icon.svelte';
  import ProductTabs from './ProductTabs.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import ProductStatus from './status/ProductStatus.svelte';
  import { product, transactions } from './product.store';
  import { isOwner } from './product.service';

  export let tab: 'auction' | 'history' | 'owner';

  $: isProductOwner = isOwner($product, $userId);

  const hasCloseButton = browser && history.length > 1;

  function onClose() {
    history.back();
  }
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={$product?.nftPublicAssets || $product.sku.nftPublicAssets} />
  </div>
  <div class="flex flex-col md:px-0" slot="onscreen-content" style="min-height: calc(100vh - var(--header-height));">
    <div class="mx-4 md:pl-4 mt-8 md:mt-10">
      <div class="flex md:flex-wrap items-center text-2xl sm:text-3xl md:text-4xl font-medium justify-between gap-6">
        {#if hasCloseButton}
          <button type="button" on:click={onClose} class="close rounded-full text-default">
            <Icon path={arrowLeft} size="1.75" class="transform scale-90 sm:scale-100 md:scale-110 p-1 rounded-full" />
            <span class="sr-only">Back</span>
          </button>
        {/if}
        <div class="flex items-center overflow-hidden">
          <a
            sveltekit:prefetch
            href={routes.sku($product.sku._id)}
            class="text-gradient-primary truncate md:overflow-visible md:whitespace-pre-wrap sku-title"
            >{$product.sku.name}</a
          >
          {#if $product.serialNumber}
            <span class="mx-3 text-gray-300">/</span>
            <span class="text-gradient-primary sku-title">#{$product.serialNumber}</span>
          {/if}
        </div>
        <div class="flex flex-row items-center space-x-4 ml-auto">
          {#if isProductOwner}
            <button
              type="button"
              class="share flex items-center justify-center gap-2 text-center text-base p-2 md:px-5 rounded-full bg-gray-100"
              use:socialShareAction={{ product: $product }}
              ><Icon path={shareIcon} size="1" class="transform scale-90 sm:scale-100 md:scale-110" /><span
                class="hidden md:inline">Share</span
              ></button
            >
          {/if}
        </div>
      </div>
      <div class="mt-6">
        <ProductInfo product={$product} transactions={$transactions} />
      </div>
    </div>

    <div class="mt-12 md:mx-0 flex flex-col flex-grow">
      <ProductTabs product={$product} {tab} {isProductOwner} />
    </div>

    <ProductStatus
      class="sticky md:w-full left-0 bottom-0 md:pb-4 lg:pb-12 md:px-4 lg:px-12"
      style="background-color: var(--product-tabs-bg);"
      product={$product}
      userId={$userId}
      transactions={$transactions}
    />
  </div>
</StickyColumn>

<style lang="postcss">
  .sticky-content {
    height: 60vh;
  }
  @screen md {
    .sticky-content {
      height: inherit;
    }
  }
  .sku-title {
    font-family: var(--product-title-font);
  }
  .close {
    background-color: var(--button-back-bg-color, var(--gray-100));
  }

  .share:hover {
    color: var(--button-brand-color-hover);
    background-image: var(--button-brand-bg-hover, none);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }

  .close:hover {
    --icons-fill: var(--icons-fill-hover);
    color: var(--button-back-color-hover, var(--button-brand-color-hover));
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }
</style>
