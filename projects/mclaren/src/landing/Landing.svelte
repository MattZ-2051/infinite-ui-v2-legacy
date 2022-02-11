<script lang="ts">
  import Hero from './Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import FeaturedCollection from './FeaturedCollection.svelte';
  import McLarenPhilosophy from './McLarenPhilosophy.svelte';
  import Community from './Community.svelte';
  import MultipleFeatured from './MultipleFeatured.svelte';
  import McLarenCollectives from './McLarenCollectives.svelte';

  export const skus = [];
</script>

<div class="z-0">
  <Hero />
  <FeaturedCollection />
  <McLarenCollectives />
  <MultipleFeatured />
  <McLarenPhilosophy />
  <FAQ />
  <Community />
</div>
