<script context="module" lang="ts">
  import type { ErrorLoadInput } from '@sveltejs/kit';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
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

  $: errorKind = error.message.split('#');
</script>

<ThemeContext id="error" class="flex flex-grow items-center justify-center" display>
  <div class="container flex flex-col gap-5 md:gap-10 items-center text-center">
    {#if errorKind[0] === 'Email not verified'}
      <div class="text-xl md:text-3xl font-semibold">We've sent an email to {errorKind[1] + ''}</div>
      <div class="text-base md:text-lg mt-4">
        Check your inbox and follow the instructions provided to verify your email.
      </div>
    {:else}
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
      <Button variant="brand" href={routes.index} class="error-button">Go to homepage</Button>
      {#if dev}
        {#if error.frame}
          <pre class="m-4 p-4 border whitespace-pre-line">{error.frame}</pre>
        {/if}
        {#if error.stack}
          <pre class="m-4 p-4 border whitespace-pre-line">{error.stack}</pre>
        {/if}
      {/if}
    {/if}
  </div>
</ThemeContext>

<style>
  a {
    color: var(--no-results-link-color);
  }
  .oh-no-message {
    font-weight: var(--error-branded-title-weight, 800);
    font-family: var(--error-branded-title-font);
  }

  .error-message {
    font-weight: var(--error-text-weight, 600);
  }

  .error-description {
    font-weight: var(--error-description-weight, 400);
    color: var(--error-description-color, --gray-500);
  }
</style>
