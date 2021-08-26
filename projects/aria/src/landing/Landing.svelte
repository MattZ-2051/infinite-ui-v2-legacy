<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';

  import SubscribeForm from '$project/SubscribeForm.svelte';
  import Intro from '$project/about/Intro.svelte';

  import LandingHero from './LandingHero.svelte';

  export let skus: Sku[];
</script>

<LandingHero />

{#if !$user}
  <div class="container mt-14">
    <SubscribeForm titleClass="text-3xl" />
  </div>
{/if}

<div class="container mt-10 lg:mt-24">
  <Tabs items={[{ id: 'latest', title: 'Latest Releases' }]} class="lg:text-3xl mb-4" itemClass="md:pb-8">
    <Tab id="latest">
      <SkuItemGrid {skus} />
    </Tab>
  </Tabs>
</div>

<div class="mt-12 md:mt-24 mb-24">
  <Intro />
</div>

<style>
</style>
