<script lang="ts">
  import Hero from './Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import FeaturedCollection from './FeaturedCollection.svelte';
  import McLarenPhilosophy from './McLarenPhilosophy.svelte';
  import Community from './Community.svelte';

  export const skus = [];
</script>

<div class="z-0">
  <Hero />
  <FeaturedCollection />
  <McLarenPhilosophy />
  <FAQ />
  <Community />
</div>

<styles />
