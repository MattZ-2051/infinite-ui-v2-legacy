<script lang="ts">
  import Hero from './Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import FeaturedCollection from './FeaturedCollection.svelte';

  export const skus = [];
</script>

<div>
  <Hero />
  <FeaturedCollection />
  <FAQ />
</div>

<styles />
