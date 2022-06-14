<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';

  const EXTERNAL_INDEX_URL = import.meta.env?.VITE_EXTERNAL_INDEX_URL as string;

  const index = EXTERNAL_INDEX_URL ? EXTERNAL_INDEX_URL : routes.index;

  export const load: ErrorLoad = ({ error, status }) => {
    return {
      props: {
        status,
        error,
      },
    };
  };
</script>

<script lang="ts">
  import { dev } from '$app/env';
  import { isBanned, onSignOut } from '$lib/user';

  export let status: number = undefined;

  // `frame` is populated by Svelte in its CompileError and is a Rollup/Vite convention
  export let error: Error & { frame?: string } = undefined;

  $: if ($isBanned && typeof window !== 'undefined') {
    onSignOut();
  }
</script>

<ThemeContext
  id="error"
  class="flex flex-grow items-center justify-center"
  display
  style="min-height: var(--error-min-height, 0);"
>
  <div class="container flex flex-col gap-5 md:gap-10 items-center text-center">
    <div class="text-6xl text-gradient-primary extra oh-no-message">Oh, no!</div>
    <div class="flex flex-col gap-4 md:gap-8">
      {#if status === 404}
        <div class="text-2xl md:text-5xl error-message">This page does not exist.</div>
        <div class="text-sm md:text-base error-description">
          The page you are looking for was moved, removed, renamed or might have never existed!
        </div>
      {:else}
        <div class="text-2xl md:text-5xl error-message">There was an unexpected problem.</div>
        <div class="text-sm md:text-base error-description">
          Please try again in a few minutes or <a href={routes.help} class="hover:underline ">contact support.</a>
        </div>
      {/if}
    </div>
    <Button variant="brand" href={index} class="error-button">Go to homepage</Button>
    {#if dev}
      {#if error.frame}
        <pre class="m-4 p-4 border whitespace-pre-line">{error.frame}</pre>
      {/if}
      {#if error.stack}
        <pre class="m-4 p-4 border whitespace-pre-line">{error.stack}</pre>
      {/if}
    {/if}
  </div>
</ThemeContext>

<style lang="postcss">
  a {
    color: var(--no-results-link-color);
  }
  .oh-no-message {
    font-weight: var(--error-branded-title-weight, 800);
    font-family: var(--error-branded-title-font);
    font-size: var(--error-branded-title-font-size-mobile, 3.75rem);
  }

  @screen sm {
    .oh-no-message {
      font-size: var(--error-branded-title-font-size-desktop, 3.75rem);
    }
  }
  .error-message {
    font-weight: var(--error-text-weight, 600);
  }

  .error-description {
    font-weight: var(--error-description-weight, 400);
    color: var(--error-description-color, --gray-500);
  }
</style>
