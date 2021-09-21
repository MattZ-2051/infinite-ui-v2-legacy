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
  import { CLIENT_SUPPORT_EMAIL } from '$project/variables';

  export let status: number = undefined;

  // `frame` is populated by Svelte in its CompileError and is a Rollup/Vite convention
  export let error: Error & { frame?: string } = undefined;
</script>

<div class="container flex flex-grow items-center justify-center">
  <div class="flex flex-col gap-5 md:gap-10 items-center text-center">
    <div class="text-6xl font-extrabold text-gradient-primary font-bold">Oh, no!</div>
    <div class="flex flex-col gap-4 md:gap-8">
      {#if status === 404}
        <div class="text-2xl md:text-5xl font-semibold">This page does not exist.</div>
        <div class="text-sm md:text-base text-gray-500">
          The page you are looking for was moved, removed, renamed or might never existed!
        </div>
      {:else}
        <div class="text-2xl md:text-5xl font-semibold">There was an unexpected problem.</div>
        <div class="text-sm md:text-base text-gray-500">
          Please try again in a few minutes or <a href="mailto:{CLIENT_SUPPORT_EMAIL}" class="hover:underline"
            >contact support</a
          >
        </div>
      {/if}
    </div>
    <Button href={routes.index}>Go to homepage</Button>
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
