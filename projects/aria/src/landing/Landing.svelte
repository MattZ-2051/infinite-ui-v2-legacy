<script lang="ts">
  import { onMount } from 'svelte';
  import type { Profile, Sku } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import { Tabs, Tab } from '$ui/tabs';
  import SubscribeForm from '$project/SubscribeForm.svelte';
  import Intro from '$project/about/Intro.svelte';
  import LandingHero from './hero/LandingHero.svelte';
  import LandingTileTalent from './tile/LandingTileTalent.svelte';
  import LandingTileSku from './tile/LandingTileSku.svelte';
  import './swiper.css';

  export let talents: Profile[];
  export let drops: Sku[];
  export let upcomings: Sku[];

  let Swiper;
  let SwiperSlide;
  let swiperConfig = {};

  onMount(async () => {
    // dynamically import swiper module
    const SwiperSvelteModule = await import('swiper/svelte');
    const { Navigation } = await import('swiper');

    Swiper = SwiperSvelteModule.Swiper;
    SwiperSlide = SwiperSvelteModule.SwiperSlide;

    swiperConfig = {
      modules: [Navigation],
      spaceBetween: 12,
      slidesPerView: 1.33,
      navigation: true,
      breakpoints: {
        '640': {
          slidesPerView: 1.5,
          spaceBetween: 18,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 36,
        },
      },
    };
  });
</script>

<LandingHero />

{#if !$user}
  <div class="container mt-14">
    <SubscribeForm titleClass="text-3xl" />
  </div>
{/if}

<div class="container flex flex-col gap-8 md:gap-14 mt-10 lg:mt-24">
  <div class="mb-16">
    <Tabs items={[{ id: 'talents', title: 'Featured Talent' }]} class="text-3xl mb-4">
      <Tab id="talents">
        <div class="-mr-4 sm:mr-0">
          <svelte:component this={Swiper} {...swiperConfig}>
            {#each talents as talent}
              <svelte:component this={SwiperSlide}>
                <LandingTileTalent {talent} />
              </svelte:component>
            {/each}
          </svelte:component>
        </div>
      </Tab>
    </Tabs>
  </div>
  <div class="mb-16">
    <Tabs items={[{ id: 'drops', title: 'Featured Drops' }]} class="text-3xl mb-4">
      <Tab id="drops">
        <div class="-mr-4 sm:mr-0">
          <svelte:component this={Swiper} {...swiperConfig}>
            {#each drops as sku}
              <svelte:component this={SwiperSlide}>
                <LandingTileSku {sku} />
              </svelte:component>
            {/each}
          </svelte:component>
        </div>
      </Tab>
    </Tabs>
  </div>

  {#if upcomings.length > 0}
    <Tabs items={[{ id: 'upcomings', title: 'Upcoming Drops' }]} class="text-3xl mb-4">
      <Tab id="upcomings">
        <div class="-mr-4 sm:mr-0">
          <svelte:component this={Swiper} {...swiperConfig}>
            {#each upcomings as sku}
              <svelte:component this={SwiperSlide}>
                <LandingTileSku {sku} />
              </svelte:component>
            {/each}
          </svelte:component>
        </div>
      </Tab>
    </Tabs>
  {/if}
</div>

<div class="mt-12 md:mt-24 mb-24">
  <Intro />
</div>

<style>
  :global(.swiper-button-next),
  :global(.swiper-button-prev) {
    top: calc((100% - 2.5rem) / 2);
  }
</style>
