<script lang="ts">
  import type { Profile, Sku } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import { Tabs, Tab } from '$ui/tabs';

  import SubscribeForm from '$project/SubscribeForm.svelte';
  import Intro from '$project/about/Intro.svelte';

  import LandingHero from './hero/LandingHero.svelte';
  import LandingTileTalent from './tile/LandingTileTalent.svelte';
  import LandingTileSku from './tile/LandingTileSku.svelte';

  export let talents: Profile[];
  export let drops: Sku[];
  export let upcomings: Sku[];
</script>

<LandingHero />

{#if !$user}
  <div class="container mt-14">
    <SubscribeForm titleClass="text-3xl" />
  </div>
{/if}

<div class="container flex flex-col gap-8 md:gap-14 mt-10 lg:mt-24">
  <div>
    <Tabs items={[{ id: 'talents', title: 'Featured Talent' }]} class="text-3xl mb-4" itemClass="">
      <Tab id="talents">
        <div class="grid grid-cols-3 gap-10">
          {#each talents as talent}
            <LandingTileTalent {talent} />
          {/each}
        </div>
      </Tab>
    </Tabs>
  </div>

  <div>
    <Tabs items={[{ id: 'drops', title: 'Featured Drops' }]} class="text-3xl mb-4" itemClass="">
      <Tab id="drops">
        <div class="grid grid-cols-3 gap-10">
          {#each drops as sku}
            <LandingTileSku {sku} />
          {/each}
        </div>
      </Tab>
    </Tabs>
  </div>

  <div>
    <Tabs items={[{ id: 'upcomings', title: 'Upcoming Drops' }]} class="text-3xl mb-4" itemClass="">
      <Tab id="upcomings">
        <div class="grid grid-cols-3 gap-10">
          {#each upcomings as sku}
            <LandingTileSku {sku} />
          {/each}
        </div>
      </Tab>
    </Tabs>
  </div>
</div>

<div class="mt-12 md:mt-24 mb-24">
  <Intro />
</div>
