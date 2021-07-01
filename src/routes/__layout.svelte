<script lang="ts">
  import { navigating } from '$app/stores';
  import { browser } from '$app/env';
  import { isLoading, updateAuth } from '$lib/auth';
  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import Header from '$lib/layout/header/Header.svelte';
  import Footer from '$lib/layout/footer/Footer.svelte';
  import { ToastContainer } from '$ui/toast';
  import { Modals } from '$ui/modals';

  import '../app.css';

  if (browser) {
    updateAuth();
  }
</script>

{#if $navigating || $isLoading}
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

<Modals />
