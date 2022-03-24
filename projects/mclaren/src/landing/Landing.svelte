<script lang="ts">
  import { page } from '$app/stores';
  // Phase 1
  import Hero1 from './phase1/Hero.svelte';
  import McLarenCollectives1 from './phase1/McLarenCollectives.svelte';
  import FAQ1 from './phase1/faq/FAQ.svelte';
  import McLarenPhilosophy1 from './phase1/McLarenPhilosophy.svelte';
  // Phase 3
  import Hero from './Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import FeaturedCollection from './FeaturedCollection.svelte';
  import McLarenPhilosophy from './McLarenPhilosophy.svelte';
  import Community from './Community.svelte';
  import MultipleFeatured from './MultipleFeatured.svelte';
  import McLarenCollectives from './McLarenCollectives.svelte';

  export const skus = [];

  $: phase = $page.url.searchParams.get('phase') ?? '1';
</script>

{#if phase === '1'}
  <div class="z-0">
    <Hero1 />
    <McLarenCollectives1 />
    <McLarenPhilosophy1 />
    <FAQ1 />
  </div>
{:else if phase === '3'}
  <div class="z-0">
    <Hero />
    <FeaturedCollection />
    <McLarenCollectives />
    <MultipleFeatured />
    <McLarenPhilosophy />
    <FAQ />
    <Community />
  </div>
{/if}
