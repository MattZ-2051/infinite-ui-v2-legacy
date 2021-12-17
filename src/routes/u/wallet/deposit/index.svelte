<script context="module">
  // Adding a redirect rule to disable this route.
  // If circle is used again for deposits this script block must be removed.
  import routes from '$project/routes';

  export async function load() {
    return {
      status: 302,
      redirect: routes.depositMoonPay,
    };
  }
</script>

<script lang="ts">
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import CardAdd from '$lib/features/card/CardAdd.svelte';
  import CardFund from '$lib/features/card/CardFund.svelte';
</script>

{#if !$wallet}
  <FullScreenLoader>Retrieving your credit card information...</FullScreenLoader>
{:else if $wallet?.cards?.length > 0}
  <CardFund card={$wallet.cards[0]} />
{:else}
  <CardAdd />
{/if}
