<script lang="ts">
  import Hero from './Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import FeaturedCollection from './FeaturedCollection.svelte';
  import McLarenPhilosophy from './McLarenPhilosophy.svelte';
  import Community from './Community.svelte';
  import MultipleFeatured from './MultipleFeatured.svelte';

  export const skus = [];
</script>

<div class="z-0">
  <Hero />
  <FeaturedCollection />
  <MultipleFeatured />
  <McLarenPhilosophy />
  <FAQ />
  <Community />
</div>

<styles />
