<script context="module" lang="ts">
  import type { ErrorLoadInput } from '@sveltejs/kit';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';

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

  export let status: number = undefined;

  // `frame` is populated by Svelte in its CompileError and is a Rollup/Vite convention
  export let error: Error & { frame?: string } = undefined;
</script>

<div class="container flex flex-grow items-center justify-center">
  <div class="flex flex-col gap-5 md:gap-10 items-center text-center">
    <div class="text-6xl font-extrabold text-gradient-primary">Oh, no!</div>
    <div class="flex flex-col gap-4 md:gap-8">
      {#if status === 404}
        <div class="text-2xl md:text-5xl font-semibold">This page does not exist.</div>
      {:else}
        <div class="text-2xl md:text-5xl font-semibold">There was an unexpected problem.</div>
        <div class="text-sm md:text-base text-gray-500">
          Please try again in a few minutes or <a href={routes.help} class="hover:underline ">contact support.</a>
        </div>
      {/if}
    </div>
    <Button variant="brand" href={routes.index}>Go to homepage</Button>
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
  a {
    color: var(--no-results-link-color);
  }
</style>
