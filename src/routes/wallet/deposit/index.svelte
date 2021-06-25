<script lang="ts">
  import type { Wallet } from '$lib/features/wallet/types';
  import { user } from '$lib/user';
  import { loadWallet } from '$lib/features/wallet/wallet.api';
  import CardAdd from '$lib/features/card/CardAdd.svelte';
  import CardFund from '$lib/features/card/CardFund.svelte';

  let wallet: Wallet;
  async function load() {
    wallet = await loadWallet();
  }

  $: $user && load();
</script>

{#if !wallet}
  <div>Loading...</div>
{:else if wallet?.cards?.length > 0}
  <CardFund card={wallet.cards[0]} />
{:else}
  <CardAdd />
{/if}
