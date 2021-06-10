<script context="module" lang="ts">
  import type { LoadOutput } from '@sveltejs/kit/types/page';

  export function load({ error, status }: LoadOutput): { props: Partial<LoadOutput> } {
    return {
      props: {
        status,
        error,
      },
    };
  }
</script>

<script lang="ts">
  import { dev } from '$app/env';

  export let status: number = null;
  export let error: string | Error = null;
</script>

<div class="bg-black text-white flex flex-grow items-center justify-center">
  <div class="flex flex-col gap-2 items-center text-center">
    <div class="text-6xl font-extrabold text-gradient-primary">Oh,no!</div>
    {#if status === 404}
      <div class="text-5xl font-bold">This page does not exist.</div>
      <div class="text-lg max-w-md mt-5 text-gray-300">
        The page you are looking for was moved, removed, renamed or might never existed!
      </div>
    {:else}
      <div class="text-5xl font-bold">There was an unexpected problem.</div>
      <div class="text-lg max-w-md mt-5 text-gray-300">
        Please try again in a few minutes or contact us.
      </div>
    {/if}
    <div class="mt-10">
      <a
        href="/"
        class="bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-base px-6 py-3"
        >Go to homepage</a
      >
    </div>
    {#if dev}
      <pre class="m-4 p-4 border">{JSON.stringify(error)}</pre>
    {/if}
  </div>
</div>
