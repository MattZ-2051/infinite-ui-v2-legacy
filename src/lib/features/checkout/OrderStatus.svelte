<script lang="ts">
  import type { Sku, Product, Listing } from '$lib/sku-item/types';
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { FilePreview } from '$ui/file';
  import { SUCCESS_PURCHASE_INSTANT_MINT } from '$project/variables';
  import errorIcon from '$lib/features/checkout/assets/error-icon.svg';
  import successIcon from '$lib/features/checkout/assets/success-icon.svg';
  import { handleCheckoutStateChange } from './checkout.service';
  import { productId, productState } from './checkout.store';

  export let product: Product = undefined;
  export let sku: Sku = undefined;
  export let listing: Listing;
  export let orderState: 'success' | 'error';
  export let ethAddress: string;
  export let onExit: () => void;
  export let backButtonLabel: string;

  const orderSuccess = orderState === 'success';
  const orderFailed = orderState === 'error';
  const isAuction = listing?.saleType === 'auction';
  const isGiveaway = listing?.saleType === 'giveaway';
  const titleMessageMap = {
    auction: 'Bid successful!',
    giveaway: 'Giveaway claimed!',
    fixed: 'Payment successful!',
  };

  const handleRetry = () => {
    handleCheckoutStateChange('method-select');
  };

  const handleViewNFT = () => {
    if (isAuction) {
      sku ? goto(routes.skuAuction(sku._id)) : goto(routes.product(product._id));
    } else if ($productId.id) {
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
        <p class="title text-4xl font-normal pl-6">{titleMessageMap[listing?.saleType]}</p>
      {/if}
    </div>
    {#if orderFailed}
      <p class="text-base pt-8 mb-2">
        Something went wrong while processing your order, check your email inbox for details.
      </p>
      <p class="text-base mb-10">
        <span>If you haven't received an email, please</span>
        <span on:click={() => goto(routes.help)} class="underline font-bold cursor-pointer">contact us</span>.
      </p>
    {:else if orderSuccess}
      <p class="text-base px-6 pt-8 mb-10 gap-y-2">
        {#if isAuction}
          Your bid was placed successfully. You will receive an email if you are outbid or if you win the auction.
        {:else}
          {@html SUCCESS_PURCHASE_INSTANT_MINT(sku?.name || product?.sku?.name)}
          <br />
          <br />
          <span class="font-bold">{ethAddress ? ethAddress : ''}</span>
        {/if}
      </p>
    {/if}
    <figure class="px-10 pb-6 sm:px-20">
      <FilePreview
        item={$productState?.status?.product?.nftPublicAssets[0] ||
          product?.nftPublicAssets?.[0] ||
          sku?.nftPublicAssets?.[0]}
        preview
        borderRadius={'var(--file-preview-border-radius, 0px)'}
      />
    </figure>
    {#if orderFailed}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleRetry}>Try again</Button>
    {:else if orderSuccess}
      <Button variant="brand" class="h-16 w-full text-2xl font-normal" on:click={handleViewNFT}>
        {#if isGiveaway}
          View your product
        {:else if isAuction}
          View Bids
        {:else}
          View NFT
        {/if}
      </Button>
    {/if}
    <Button variant="outline-brand" class="h-16 w-full text-xl mt-4" on:click={onExit}>
      {backButtonLabel}
    </Button>
  </div>
</div>

<style lang="postcss">
  .title {
    font-family: var(--title-font-family);
  }
</style>
