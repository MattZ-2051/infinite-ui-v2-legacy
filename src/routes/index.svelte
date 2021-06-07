<script context="module">
  export async function load({ fetch }) {
    const res = await fetch(
      `https://api.goinfinite.io/skus/tiles/?page=1&per_page=50&sortBy=startDate:1`
    );
    return {
      props: {
        items: await res.json(),
      },
    };
  }
</script>

<script lang="ts">
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
  import type { Sku } from '$lib/sku-item/types';

  import Image from '$ui/image/Image.svelte';

  import landing from '$static/landing.png?w=400;800;1200&format=avif;webp;png&metadata';
  import weAreDisruption from '$static/we_are_disruption.png?w=400;1000;&format=avif;webp;png&metadata';
  import TravisScott from '$static/Travis-Scott-iHeart-Radio.png?w=350;500&format=avif;webp;png&metadata';
  // import digital_bg from '$static/digital_bg.png?w=400;800;1200&format=avif;webp;png&metadata';

  import AriaLogoComp from '$lib/shared/AriaLogoComp.svelte';

  export let items: Sku[];
</script>

<div class="relative" style="height: min(50vw, 50vh);">
  <Image src={landing} loading="eager" class="absolute w-full h-full object-cover" />
  <Image
    src={weAreDisruption}
    class="absolute top-0 right-0 z-10"
    style="width: min(90vw, 90vh); transform: rotate(-90deg) translateY(-100%); transform-origin: top right;"
    setDimensions={true}
  />
</div>
<div class="relative flex-grow text-white" style="background-color: #0d0a0d">
  <!-- <Image src={digital_bg} class="absolute w-full h-full object-cover -z-1" /> -->
  <div class="hero-text container flex flex-col mt-8">
    <div
      class="flex flex-col text-right font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
    >
      <div>WELCOME TO</div>
      <div>THE ARIA EXCHANGE.</div>
    </div>
    <div class="flex justify-between">
      <Image
        src={TravisScott}
        alt="Travis Scott"
        class="w-1/3 mt-40 hidden xl:block"
        style="width: 500px;"
      />
      <div
        class="flex justify-end text-right text-lg md:text-2xl lg:text-5xl mt-12 w-full xl:w-2/3 "
      >
        <div class="max-w-2xl">
          <div>
            <div><span class="highlight-text">The most</span> dynamic, original,</div>
            <div>transparent, secure and</div>
            <div>sustainable <span class="highlight-text">NFT Exchange</span>.</div>
          </div>
          <div>Ever.</div>
        </div>
      </div>
    </div>
    <div />
  </div>

  <div class="container mt-10 lg:mt-24">
    <TabsVariantDark>
      <Tabs class="text-xl md:text-2xl lg:text-3xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Latest Releases"
          ><div>
            <SkuItemVariantDark><SkuItemGrid {items} class="mt-4" /></SkuItemVariantDark>
          </div></Tab
        >
        <Tab title="All Collections">Tab 2!!!!!</Tab>
        <!-- <div slot="extra">extra data!!!</div> -->
      </Tabs>
    </TabsVariantDark>

    <AriaLogoComp />
  </div>
</div>

<style>
  .hero-text {
    padding-right: calc(0.16 * min(90vw, 90vh));
  }

  .highlight-text {
    color: #9a9a9a;
  }
</style>
