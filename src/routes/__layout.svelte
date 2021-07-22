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
  import { initUserAuth } from '$lib/user';
  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import Header from '$lib/layout/header/Header.svelte';
  import Footer from '$lib/layout/footer/Footer.svelte';
  import { ToastContainer } from '$ui/toast';
  import { Modals } from '$ui/modals';
  import Scrim from '$ui/scrim/Scrim.svelte';

  import '../app.css';

  if (browser) {
    initUserAuth();
  }

  const navigationPathChanging = derived(
    navigating,
    ($navigating) => $navigating && $navigating.from.path !== $navigating.to.path
  );
</script>

{#if $navigationPathChanging || $isLoading}
  <PreloadIndicator />
{/if}

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="relative flex flex-col flex-grow">
    <div class="fixed top-0 left-0 right-0 text-xl italic font-extrabold z-50">
      <ToastContainer />
    </div>

    <slot />
  </main>
  <Footer />
</div>

<Modals><Scrim slot="backdrop" /></Modals>
