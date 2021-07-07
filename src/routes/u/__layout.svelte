<script script lang="ts">
  import { browser } from '$app/env';
  import { getAuthToken, login } from '$lib/auth';
  import { Seo } from '$lib/seo';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let isAuthenticated = new Promise(() => {});

  if (browser) {
    (async () => {
      try {
        await (isAuthenticated = getAuthToken());
      } catch {}
    })();
  }
</script>

<Seo title="User Area" />

{#await isAuthenticated}
  <FullScreenLoader />
{:then}
  <slot />
{:catch}
  <div class="bg-black text-white flex flex-grow items-center justify-center">
    <div class="flex flex-col gap-2 items-center text-center">
      <div class="text-6xl font-extrabold text-gradient-primary">Oh,no!</div>
      <div class="text-5xl font-bold">You need to login to view this page.</div>
      <div class="mt-10">
        <button
          type="button"
          on:click={() => login()}
          class="bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-lg px-12 py-3"
          >Login</button
        >
      </div>
    </div>
  </div>
{/await}
