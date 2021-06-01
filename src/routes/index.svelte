<script lang="ts">
  import Header from '$lib/header/Header.svelte';
</script>

<Header />

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a class="text-red-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation
</p>

<style>
  h1 {
    @apply text-lg;
    @apply font-extrabold;
    color: theme('colors.purple.500');
  }
</style>
