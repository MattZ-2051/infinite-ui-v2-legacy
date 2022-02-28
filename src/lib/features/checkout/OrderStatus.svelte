<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { FilePreview } from '$ui/file';
  import errorIcon from './assets/error-icon.svg';
  import successIcon from './assets/success-icon.svg';
  import { handleStateChange } from './checkout.service';
  import { productId } from './checkout.store';

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
  <div class="flex py-32 flex-col max-w-xl">
    <div class="flex items-center">
      {#if orderFailed}
        <img src={errorIcon} alt="error icon" class="w-12 sm:w-auto" />
        <p class="text-3xl sm…text-4xl font-normal pl-6">Payment failed</p>
      {:else if orderSuccess}
        <img src={successIcon} alt="error icon" />
        <p class="text-4xl font-normal pl-6">Payment successful!</p>
      {/if}
    </div>
    {#if orderFailed}
      <p class="text-base pt-8">
        We weren't able to process your payment. Please check your information and try again.
      </p>
    {:else if orderSuccess}
      <p class="text-base pt-8">
        Your purchase was successful, and <span class="font-bold px-1">{sku.name}</span>has been added to your
        collection.
      </p>
    {/if}
    <figure class="m-10 sm:m-20">
      <FilePreview item={sku.nftPublicAssets?.[0]} preview />
    </figure>
    {#if orderFailed}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleRetry}>Try again</Button>
    {:else if orderSuccess}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleViewNFT}>View NFT</Button>
    {/if}
    <Button
      variant="outline-brand"
      class="border-none h-16 w-full text-xl mt-4"
      on:click={() => goto(routes.marketplace)}>Back to Marketplace</Button
    >
  </div>
</div>
