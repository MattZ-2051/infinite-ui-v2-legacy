<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';
  import { derived } from 'svelte/store';
  import { browser, mode } from '$app/env';
  import { variables } from '$lib/variables';
  import projectRedirects from '$project/redirects';
  import Maintenance from '$lib/components/maintenance/Maintenance.svelte';

  export async function load(input: LoadInput): Promise<LoadOutput> {
    const EXTERNAL_INDEX_URL = import.meta.env?.VITE_EXTERNAL_INDEX_URL as string;
    const redirectMatch = projectRedirects({ externalUrlBase: EXTERNAL_INDEX_URL }).find(
      (redirect) => redirect.route === input.url.pathname
    );

    if (redirectMatch) {
      return {
        status: redirectMatch.status,
        redirect: redirectMatch.redirect,
      };
    }
    return input;
  }
</script>

<script lang="ts">
  import { navigating } from '$app/stores';
  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import initializeSentry from '$lib/sentry';
  import Header from '$project/header/Header.svelte';
  import Toast from '$project/toast/Toast.svelte';
  import { CLIENT_API_HEADER, INFINITE_EXTENSION_ENABLED, ENABLE_GDPR_BANNER } from '$project/variables';
  import { Modals, modals } from '$ui/modals';
  import Scrim from '$ui/scrim/Scrim.svelte';
  import GdprBanner from '$lib/components/gdpr/GdprBanner.svelte';
  import Head from '$project/Head.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { InfiniteExtensionLoadFx } from '$lib/features/infinite-wallet/infinite-wallet.store';

  import '$theme/theme.css';
  import '../../../src/app.css';
  import '$theme/app.css';

  $: if (browser && INFINITE_EXTENSION_ENABLED) {
    InfiniteExtensionLoadFx();
    document.addEventListener('hederaWalletLoaded', () => InfiniteExtensionLoadFx());
  }

  const navigationPathChanging = derived(
    navigating,
    ($navigating) => $navigating && $navigating.from.pathname !== $navigating.to.pathname
  );

  $: initializeSentry(mode, undefined, CLIENT_API_HEADER);
</script>

<Head />
{#if variables.maintenance.maintenanceMode === 'true'}
  <Maintenance />
{:else}
  <ThemeContext display id="root">
    {#if $navigationPathChanging}
      <PreloadIndicator />
    {/if}

    {#if ENABLE_GDPR_BANNER}<GdprBanner />{/if}

    <div class="flex flex-col columns-2 min-h-screen overflow-x-hidden relative">
      <Header />

      <div class="{$modals.length > 0 ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-toast">
        <Toast />
      </div>

      <main class="flex flex-col flex-grow">
        <slot />
      </main>
    </div>

    <Modals><Scrim slot="backdrop" /></Modals>
  </ThemeContext>
{/if}
