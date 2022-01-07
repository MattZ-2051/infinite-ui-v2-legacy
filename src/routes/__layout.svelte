<script context="module" lang="ts">
  import { derived } from 'svelte/store';
  import { browser, mode } from '$app/env';
  import { isLoading, initUserAuth, mustSetupAccount, user } from '$lib/user';
  import { variables } from '$lib/variables';
  import Maintenance from '$lib/components/Maintenance.svelte';

  if (variables.apiMocking) {
    (async () => {
      if (!browser) {
        const { default: server } = await import('../../mocks/server');
        server.listen();
      } else {
        const { default: worker } = await import('../../mocks/browser');
        worker.start();
      }
    })();
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
  import { CLIENT_API_HEADER } from '$project/variables';
  import { Modals, modals } from '$ui/modals';
  import Scrim from '$ui/scrim/Scrim.svelte';
  import GdprBanner from '$lib/components/GdprBanner.svelte';
  import Head from '$project/Head.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';

  import '$theme/theme.css';
  import '../app.css';
  import '$theme/app.css';

  if (browser) {
    initUserAuth();
  }

  const navigationPathChanging = derived(
    navigating,
    ($navigating) => $navigating && $navigating.from.pathname !== $navigating.to.pathname
  );

  $: $user && pollPendingTransactions();
  $: $user && pollWallet();
  $: mustSetupAccount($user, $page.url.pathname);
  $: initializeSentry(mode, $user, CLIENT_API_HEADER);
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
