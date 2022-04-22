<script lang="ts">
  import { page } from '$app/stores';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import Community from '../common/Community/Community.svelte';
  // PHASE 1
  import Hero1 from './phase1/Hero.svelte';
  import FAQ from './faq/FAQ.svelte';
  import McLarenFuturePerformance1 from './phase1/McLarenFuturePerformance.svelte';
  import McLarenSupercarCompany1 from './phase1/McLarenSupercarCompany.svelte';

  // PHASE 2 ONLY
  import McLarenSupercarCompany2 from './phase2/McLarenSupercarCompany.svelte';

  // PHASE 2 & 3
  import Hero from './phase3/Hero.svelte';
  import McLarenFuturePerformance from './phase3/McLarenFuturePerformance.svelte';
  import GenesisCollection from './phase3/McLarenF1Genesis.svelte';
  import McLarenSupercarCompany from './phase3/McLarenSupercarCompany.svelte';
  import UpcomingCollection from './phase3/FeaturedCollection.svelte';

  $: phase = $page.url.searchParams.get('phase') ?? '1';
</script>

{#if phase === '1'}
  <div class="z-0">
    <Hero1 />
    <McLarenFuturePerformance1 />
    <McLarenSupercarCompany1 />
    <FAQ curvedImg={false} />
  </div>
{:else if phase === '2' || phase === '3'}
  <div class="z-0">
    {#if phase === '2'}
      <Hero urlAsset={bucketAssets.landing.hero} />
    {/if}
    {#if phase === '3'}
      <Hero urlAsset={bucketAssets.landing.hero3} />
    {/if}
    <McLarenFuturePerformance />
    <GenesisCollection {phase} />
    {#if phase === '2'}
      <McLarenSupercarCompany2 />
    {/if}
    {#if phase === '3'}
      <UpcomingCollection />
      <McLarenSupercarCompany />
    {/if}
    <FAQ curvedImg={phase === '2'} />
    <Community />
  </div>
{/if}
