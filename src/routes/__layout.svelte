<script lang="ts">
  import { navigating } from '$app/stores';

  import PreloadIndicator from '$lib/layout/PreloadIndicator.svelte';
  import Header from '$lib/layout/header/Header.svelte';
  import Footer from '$lib/layout/footer/Footer.svelte';
  import Toast from '$lib/toast/Toast.svelte';

  import '../app.css';
</script>

{#if $navigating}
  <PreloadIndicator />
{/if}

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="relative flex flex-col flex-grow">
    <div class="fixed top-0 left-0 right-0 text-xl italic font-extrabold z-50">
      <Toast />
    </div>

    <slot />
  </main>
  <Footer />
</div>
