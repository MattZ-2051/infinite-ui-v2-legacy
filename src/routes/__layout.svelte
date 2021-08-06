<script context="module" lang="ts">
  import { derived } from 'svelte/store';
  import { browser } from '$app/env';
  import { variables } from '$lib/variables';

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
  import { navigating } from '$app/stores';
  import { isLoading } from '$lib/auth';
  import { initUserAuth, user } from '$lib/user';
  import { pollPendingTransactions } from '$lib/features/wallet/wallet.poll';
  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import Header from '$lib/layout/header/Header.svelte';
  import Footer from '$lib/layout/footer/Footer.svelte';
  import { ToastContainer } from '$ui/toast';
  import { Modals, modals } from '$ui/modals';
  import Scrim from '$ui/scrim/Scrim.svelte';
  import GdprBanner from '$lib/components/GdprBanner.svelte';
  import Head from '$scope/Head.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';

  import '$theme/theme.css';
  import '../app.css';

  if (browser) {
    initUserAuth();
  }

  const navigationPathChanging = derived(
    navigating,
    ($navigating) => $navigating && $navigating.from.path !== $navigating.to.path
  );

  $: $user && pollPendingTransactions();
</script>

<svelte:head>
  <Head />
</svelte:head>

{#if $navigationPathChanging || $isLoading}
  <PreloadIndicator />
{/if}

<GdprBanner />

<ThemeContext>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="{$modals.length > 0 ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-toast">
      <ToastContainer class="absolute top-0 left-0 right-0 overflow-hidden text-xl italic font-extrabold" />
    </div>

    <main class="relative flex flex-col flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</ThemeContext>

<Modals><Scrim slot="backdrop" /></Modals>
