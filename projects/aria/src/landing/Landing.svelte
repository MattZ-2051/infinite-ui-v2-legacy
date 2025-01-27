<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import { Navigation } from 'swiper';
  import { user } from '$lib/user';
  import { Tabs, Tab } from '$ui/tabs';
  import SubscribeForm from '$project/subscribe/SubscribeForm.svelte';
  import Intro from '$project/about/Intro.svelte';
  import LandingHero from './LandingHero.svelte';
  import LandingTileTalent from './tile/LandingTileTalent.svelte';
  import LandingTileSku from './tile/LandingTileSku.svelte';
  import './swiper.css';

  export let talents: Profile[];
  export let drops: SkuV2[];
  export let upcomings: SkuV2[];

  const swiperConfig = {
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
      '1280': {
        slidesPerView: 4,
        spaceBetween: 36,
      },
    },
  };
</script>

<LandingHero />

{#if !$user}
  <div class="container mt-8">
    <SubscribeForm titleClass="text-3xl pb-2" />
  </div>
{/if}

<div class="container flex flex-col gap-8 md:gap-14 mt-8">
  <div class="mb-16">
    <Tabs items={[{ id: 'talents', title: 'Featured Talent' }]} class="text-3xl mb-4 section-title">
      <Tab id="talents">
        <div class="-mr-4 sm:mr-0">
          <Swiper {...swiperConfig}>
            {#each talents as talent}
              <SwiperSlide>
                <LandingTileTalent {talent} />
              </SwiperSlide>
            {/each}
          </Swiper>
        </div>
      </Tab>
    </Tabs>
  </div>
  <div class="mb-16">
    <Tabs items={[{ id: 'drops', title: 'Featured Drops' }]} class="text-3xl mb-4 section-title">
      <Tab id="drops">
        <div class="-mr-4 sm:mr-0">
          <Swiper {...swiperConfig}>
            {#each drops as sku}
              <SwiperSlide>
                <LandingTileSku {sku} />
              </SwiperSlide>
            {/each}
          </Swiper>
        </div>
      </Tab>
    </Tabs>
  </div>

  {#if upcomings.length > 0}
    <Tabs items={[{ id: 'upcomings', title: 'Upcoming Drops' }]} class="text-3xl mb-4 section-title">
      <Tab id="upcomings">
        <div class="-mr-4 sm:mr-0">
          <Swiper {...swiperConfig}>
            {#each upcomings as sku}
              <SwiperSlide>
                <LandingTileSku {sku} />
              </SwiperSlide>
            {/each}
          </Swiper>
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
  :global(.swiper-button-prev.swiper-button-disabled),
  :global(.swiper-button-next.swiper-button-disabled) {
    display: none;
  }
</style>
