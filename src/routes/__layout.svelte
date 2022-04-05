<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/internal';
  import { derived } from 'svelte/store';
  import { browser, mode } from '$app/env';
  import { loadTenantSettings } from '$lib/tenant/settings.service';
  import { isLoading, initUserAuth, mustSetupAccount, user } from '$lib/user';
  import { variables } from '$lib/variables';
  import projectRedirects from '$project/redirects';
  import Maintenance from '$lib/components/Maintenance.svelte';
  import '@stripe/stripe-js';

  if (import.meta.env.VITE_API_MOCKING === 'enabled') {
    (async () => {
      const { default: initMock } = await import('../../mocks');
      initMock(browser);
    })();
  }

  export async function load(input: LoadInput): Promise<LoadOutput> {
    const EXTERNAL_INDEX_URL = import.meta.env?.VITE_EXTERNAL_INDEX_URL as string;
    const redirectMatch = projectRedirects({ externalUrlBase: EXTERNAL_INDEX_URL }).find(
      (redirect) => redirect.route === input.url.pathname
    );

    await loadTenantSettings({ fetch: input.fetch });

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
  import { navigating, page } from '$app/stores';
  import { pollWallet, pollPendingTransactions } from '$lib/features/wallet/wallet.poll';
  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import initializeSentry from '$lib/sentry';
  import Header from '$project/header/Header.svelte';
  import Footer from '$project/footer/Footer.svelte';
  import Toast from '$project/toast/Toast.svelte';
  import { onAfterNavigate } from '$project/navigation';
  import { CLIENT_API_HEADER, INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import { Modals, modals } from '$ui/modals';
  import Scrim from '$ui/scrim/Scrim.svelte';
  import GdprBanner from '$lib/components/gdpr/GdprBanner.svelte';
  import Head from '$project/Head.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { InfiniteExtensionLoadFx } from '$lib/features/infinite-wallet/infinite-wallet.store';

  import '$theme/theme.css';
  import '../app.css';
  import '$theme/app.css';

  if (browser) {
    initUserAuth();
  }

  $: if (browser && INFINITE_EXTENSION_ENABLED && $user) {
    InfiniteExtensionLoadFx();
    document.addEventListener('hederaWalletLoaded', () => InfiniteExtensionLoadFx());
  }

  const navigationPathChanging = derived(
    navigating,
    ($navigating) => $navigating && $navigating.from.pathname !== $navigating.to.pathname
  );

  $: $user && pollPendingTransactions();
  $: $user && pollWallet();
  $: mustSetupAccount($user, $page.url.pathname);
  $: initializeSentry(mode, $user, CLIENT_API_HEADER);

  // Call lifecycle hooks from project
  onAfterNavigate();
</script>

<Head />
{#if variables.maintenance.maintenanceMode === 'true'}
  <Maintenance />
{:else}
  <ThemeContext display id="root">
    {#if $navigationPathChanging || $isLoading}
      <PreloadIndicator />
    {/if}

    <GdprBanner />

    <div class="flex flex-col min-h-screen">
      <Header />

      <div class="{$modals.length > 0 ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-toast">
        <Toast />
      </div>

      <main class="relative flex flex-col flex-grow">
        <slot />
      </main>
      <Footer />
    </div>

    <Modals><Scrim slot="backdrop" /></Modals>
  </ThemeContext>
{/if}
