<script lang="ts">
  import Account from '$lib/features/account/Account.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { user } from '$lib/user';
</script>

{#if $user}
  <Account user={$user} />
{:else}
  <FullScreenLoader class="text-black" />
{/if}
