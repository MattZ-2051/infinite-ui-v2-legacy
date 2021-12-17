<script script lang="ts">
  import { browser } from '$app/env';
  import { session } from '$app/stores';
  import { Seo } from '$lib/seo';
  import { getAuthToken, onSignIn, user } from '$lib/user';
  import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let isAuthenticated = new Promise(() => {});

  if (AUTH_PROVIDER_IS_AUTH0 && browser) {
    (async () => {
      try {
        await (isAuthenticated = getAuthToken());
      } catch {}
    })();
  }
</script>

<Seo title="User Area" />

{#if AUTH_PROVIDER_IS_AUTH0}
  {#await isAuthenticated}
    <FullScreenLoader />
  {:then}
    <slot />
  {:catch error}
    {error.message}
  {/await}
{:else if $session?.user}
  {#if !$user}
    <FullScreenLoader />
  {:else}
    <slot />
  {/if}
{:else}
  <div class="bg-black text-white flex flex-grow items-center justify-center">
    <div class="flex flex-col gap-2 items-center text-center">
      <div class="text-6xl font-extrabold text-gradient-primary">Oh,no!</div>
      <div class="text-5xl font-bold">You need to login to view this page.</div>
      <div class="mt-10">
        <button
          type="button"
          on:click={onSignIn}
          class="bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-lg px-12 py-3"
          >Login</button
        >
      </div>
    </div>
  </div>
{/if}
