<script lang="ts">
  import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import Toast from '$lib/toast/Toast.svelte';

  import '../app.css';
</script>

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
