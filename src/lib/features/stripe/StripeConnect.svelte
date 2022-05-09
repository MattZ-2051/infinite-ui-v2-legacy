<script lang="ts">
  import { page } from '$app/stores';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { user } from '$lib/user';
  import { connectStripeAccountFx } from './stripe.store';

  $: isLoading = false;

  // ToDo: Handle error case

  async function handleSubmit() {
    isLoading = true;
    const redirectUrl = await connectStripeAccountFx({
      return_url: $page.url.toString(),
      refresh_url: $page.url.toString(),
    });
    typeof window !== 'undefined' && window.open(redirectUrl, '_blank').focus();
    isLoading = false;
  }
</script>

{#if $user}
  <form id="payment-form" on:submit|preventDefault={handleSubmit}>
    {#if isLoading}
      <div class="flex justify-center">
        <DualRingLoader />
      </div>
    {:else}
      <button type="submit" disabled={isLoading}>Connect</button>
    {/if}
  </form>
{/if}
