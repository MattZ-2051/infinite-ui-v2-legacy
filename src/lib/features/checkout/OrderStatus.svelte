<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { FilePreview } from '$ui/file';
  import errorIcon from '$lib/features/checkout/assets/error-icon.svg';
  import { SUCCESS_PURCHASE_CONTENT } from '$project/variables';
  import successIcon from './assets/success-icon.svg';
  import { handleStateChange } from './checkout.service';
  import { productId } from './checkout.store';

  const DISABLED_MARKETPLACE = import.meta.env?.VITE_DISABLE_MARKETPLACE === 'true';

  export let sku: Sku = undefined;
  export let orderState: 'success' | 'error';

  const orderSuccess = orderState === 'success';
  const orderFailed = orderState === 'error';

  const handleRetry = () => {
    handleStateChange('method-select');
  };

  const handleViewNFT = () => {
    if ($productId.id) {
      goto(routes.product($productId.id));
    } else {
      window.open('https://opensea.io/account?tab=activity');
    }
  };
</script>

<div class="w-full h-full flex justify-center items-center col-span-2">
  <div class="flex py-10 flex-col max-w-xl">
    <div class="flex items-center">
      {#if orderFailed}
        <img src={errorIcon} alt="error icon" class="w-12 sm:w-auto" />
        <p class="title text-3xl sm:text-4xl font-normal pl-6">Payment failed</p>
      {:else if orderSuccess}
        <img src={successIcon} alt="success icon" />
        <p class="title text-4xl font-normal pl-6">Payment successful!</p>
      {/if}
    </div>
    {#if orderFailed}
      <p class="text-base pt-8 mb-10">
        We weren't able to process your payment. Please check your information and try again.
      </p>
    {:else if orderSuccess}
      <p class="text-base px-6 pt-8 mb-10">
        {@html SUCCESS_PURCHASE_CONTENT(sku.name)}
      </p>
    {/if}
    <figure class="px-10 pb-6 sm:px-20">
      <FilePreview item={sku.nftPublicAssets?.[0]} preview borderRadius={'var(--file-preview-border-radius, 0px)'} />
    </figure>
    {#if orderFailed}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleRetry}>Try again</Button>
    {:else if orderSuccess}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleViewNFT}>View NFT</Button>
    {/if}
    <Button
      variant="outline-brand"
      class="border-none h-16 w-full text-xl mt-4"
      on:click={() => (DISABLED_MARKETPLACE ? goto(routes.index) : goto(routes.marketplace))}
    >
      Back to {DISABLED_MARKETPLACE ? 'home' : 'marketplace'}
    </Button>
  </div>
</div>

<style lang="postcss">
  .title {
    font-family: var(--title-font-family);
  }
</style>
