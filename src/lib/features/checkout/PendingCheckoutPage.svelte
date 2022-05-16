<script lang="ts">
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import { variables } from '$lib/variables';
  import { productState } from './checkout.store';

  const { txHash } = $productState.data;

  const handleRedirectToMarketPlace = () => goto(routes.marketplace);

  const linkClass = `link pt-5 text-center text-gray-500 cursor-pointer hover:text-gray-800 ${
    !txHash ? 'disabled' : ''
  }`;
</script>

<div class="flex justify-center flex-col text-center">
  <h2 class="title text-4xl pb-10">Order processing is taking longer than expected</h2>

  <p class="text-base  pb-10 para">We'll send you an email when your purchase has been completed.</p>

  <Button variant="brand" class="h-16 w-full te../stripe/stripe.storermal  pb-10" on:click={handleRedirectToMarketPlace}
    >Back to Marketplace</Button
  >

  <a href={`${variables.ethNetwork.explorerBaseUrl}${txHash}`} target="_blank" class={linkClass}
    >View transaction on Etherscan</a
  >
</div>

<style lang="postcss">
  .title {
    font-family: var(--title-font-family);
    font-weight: 500;
    line-height: 2.8rem;
  }
  .link {
    text-decoration: none;
    opacity: 0.5;
  }
  .disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
