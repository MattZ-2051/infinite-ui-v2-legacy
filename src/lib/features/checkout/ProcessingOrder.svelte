<script lang="ts">
  import type { Currency } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import { variables } from '$lib/variables';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import routes from '$project/routes';

  export let etherscanLink = '';
  export let currency: Currency;

  const DISABLED_MARKETPLACE = variables.disabledMarketplace;
  const messageMap = {
    USD: {
      title: "We're processing your order...",
      description: 'It can take up to 30 minutes for the order to process and the NFT to appear on your wallet.',
    },
    ETH: {
      title: 'We’re processing your order and trying to avoid ‘gas wars’!',
      description:
        'It can take up to 7 minutes or 12 block confirmations for your order to process and the NFT to appear in your wallet.',
    },
  };

  onMount(() => {
    window.focus();
    window.scrollTo(0, 0);
  });
</script>

<div class="flex flex-col xl:max-w-sm justify-center justify-self-center">
  <span class="text-2xl xl:text-3xl mb-10">{messageMap[currency].title}</span>
  <span class="mb-4 text-gray-700 ">{messageMap[currency].description}</span>
  {#if !DISABLED_MARKETPLACE}
    <div class="mb-4 text-gray-700">
      <span>You can wait for the order to process, close this window or</span>
      <a class="underline underline-offset-4" href={routes.marketplace}>go back to the Marketplace.</a>
    </div>
  {/if}
  <span class="mb-10 font-bold"
    >We’ll send you an email when your purchase has completed and when your NFT is minted.
  </span>
  <Button class="h-16" variant="brand" disabled><DualRingLoader /></Button>
  {#if etherscanLink}
    <a
      class="mt-6 text-center text-gray-500 hover:underline cursor-pointer hover:text-gray-800 w-fit self-center"
      target="_blank"
      href={etherscanLink}
    >
      View transaction on Etherscan
    </a>
  {/if}
</div>
