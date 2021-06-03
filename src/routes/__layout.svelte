<script lang="ts">
  import Header from '$lib/header/Header.svelte';
  import Footer from '$lib/footer/Footer.svelte';
  import Toast from '$lib/toast/Toast.svelte';

  import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="relative flex flex-col flex-grow">
    <div class="absolute top-0 w-full">
      <Toast class="fixed left-0 right-0 text-xl italic font-extrabold" />
    </div>

    <slot />
  </main>
  <Footer />
</div>
