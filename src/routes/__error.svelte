<script context="module" lang="ts">
  import type { ErrorLoadInput } from '@sveltejs/kit';
  import routes from '$lib/routes';

  export function load({ error, status }: ErrorLoadInput): { props: Partial<ErrorLoadInput> } {
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
  import { CLIENT_SUPPORT_EMAIL } from '$project/variables';

  export let status: number = undefined;

  // `frame` is populated by Svelte in its CompileError and is a Rollup/Vite convention
  export let error: Error & { frame?: string } = undefined;
</script>

<div class="container flex flex-grow items-center justify-center">
  <div class="flex flex-col gap-2 items-center text-center">
    <div class="text-6xl font-extrabold text-gradient-primary">Oh,no!</div>
    <div class="flex flex-col gap-5 md:gap-10 font-bold">
      {#if status === 404}
        <div class="text-2xl md:text-5xl ">This page does not exist.</div>
        <div class="text-sm md:text-base">
          Please <a href="mailto:{CLIENT_SUPPORT_EMAIL}" class="hover:underline">contact support</a> if you believe this
          was an error
        </div>
      {:else}
        <div class="text-2xl md:text-5xl">There was an unexpected problem.</div>
        <div class="text-sm md:text-base">
          Please try again in a few minutes or <a href="mailto:{CLIENT_SUPPORT_EMAIL}" class="hover:underline"
            >contact support</a
          >
        </div>
      {/if}
    </div>
    <div class="mt-10">
      <a
        href={routes.index}
        class="bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-base px-6 py-3"
        >Go to homepage</a
      >
    </div>
    {#if dev}
      {#if error.frame}
        <pre class="m-4 p-4 border whitespace-pre-line">{error.frame}</pre>
      {/if}
      {#if error.stack}
        <pre class="m-4 p-4 border whitespace-pre-line">{error.stack}</pre>
      {/if}
    {/if}
  </div>
</div>

<style>
  a[href^='mailto:'] {
    color: var(--no-results-link-color);
  }
</style>
