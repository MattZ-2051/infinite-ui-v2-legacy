<script lang="ts">
  import Header from '$lib/header/Header.svelte';
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="flex flex-col flex-grow">
    <slot />
  </main>
</div>
