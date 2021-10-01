<script script lang="ts">
  import { session } from '$app/stores';
  // ToDo: Remove after all envs migrate to cognito
  // eslint-disable-next-line no-restricted-imports
  import routes from '$lib/routes';
  import { Seo } from '$lib/seo';
  import { user } from '$lib/user';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
</script>

<Seo title="User Area" />

{#if $session?.user}
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
          on:click={routes.signin}
          class="bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-lg px-12 py-3"
          >Login</button
        >
      </div>
    </div>
  </div>
{/if}
