<script lang="ts">
  import { page } from '$app/stores';
  // PHASE 1
  import Hero1 from './phase1/Hero.svelte';
  import McLarenCollectives1 from './phase1/McLarenCollectives.svelte';
  import FAQ1 from './phase1/faq/FAQ.svelte';
  import McLarenPhilosophy1 from './phase1/McLarenPhilosophy.svelte';

  // PHASE 3
  import Hero from './phase3/Hero.svelte';
  import McLarenCollectives from './phase3/McLarenCollectives.svelte';
  import McLarenF1Classics from './phase3/McLarenF1Classics.svelte';
  import McLarenPhilosophy from './phase3/McLarenPhilosophy.svelte';
  import UpcomingCollection from './phase3/FeaturedCollection.svelte';
  import FAQ from './phase3/faq/FAQ.svelte';
  import Community from './phase3/Community.svelte';

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
    <McLarenCollectives />
    <McLarenF1Classics />
    <UpcomingCollection />
    <McLarenPhilosophy />
    <FAQ />
    <Community />
  </div>
{/if}
