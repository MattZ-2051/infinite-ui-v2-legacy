<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import routes from '$project/routes';

  export let etherscanLink = '';

  const DISABLED_MARKETPLACE = import.meta.env?.VITE_DISABLE_MARKETPLACE === 'true';
</script>

<div class="flex flex-col xl:max-w-sm justify-center justify-self-center">
  <span class="text-2xl xl:text-3xl mb-10">We're processing your order...</span>
  <span class="mb-4 text-gray-700 "
    >It can take up to 30 minutes for the order to process and the NFT to appear on your wallet.</span
  >
  <div class="mb-4 text-gray-700">
    {#if DISABLED_MARKETPLACE}
      <span>You can wait for the order to process or close this window</span>
    {:else}
      <span>You can wait for the order to process, close this window or</span>
      <a class="underline underline-offset-4" href={routes.marketplace}>go back to the Marketplace.</a>
    {/if}
  </div>
  <span class="mb-10 font-bold">We'll send you an email when your purchase has been completed.</span>
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
