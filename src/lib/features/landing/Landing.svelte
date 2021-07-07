<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
  import Image from '$ui/image/Image.svelte';

  import TravisScott from '$static/Travis-Scott-iHeart-Radio.png?w=350;500&format=avif;webp;png&metadata';
  // import digital_bg from '$static/digital_bg.png?w=400;800;1200&format=avif;webp;png&metadata';

  import Logo from '$lib/components/Logo.svelte';
  import LandingHero from './LandingHero.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<LandingHero />

<div
  class="relative flex-grow text-white"
  style="background-color: #0d0a0d; background-image: linear-gradient( #0d0a0d, #000000);"
>
  <!-- <Image src={digital_bg} class="absolute w-full h-full object-cover -z-1" /> -->
  <div class="hero-text container flex flex-col mt-8">
    <div class="flex flex-col text-right font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
      <div>WELCOME TO</div>
      <div>THE ARIA EXCHANGE.</div>
    </div>
    <div class="flex justify-between">
      <Image src={TravisScott} alt="Travis Scott" class="w-1/3 mt-40 hidden xl:block" style="width: 500px;" />
      <div class="flex justify-end text-right text-lg md:text-2xl lg:text-5xl mt-12 w-full xl:w-2/3 ">
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
      <Tabs class="text-xl md:text-2xl lg:text-3xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Latest Releases">
          <SkuItemVariantDark><SkuItemGrid {skus} /></SkuItemVariantDark>
        </Tab>
        <Tab title="All Collections">
          <SkuItemVariantDark><SkuItemGrid {products} /></SkuItemVariantDark>
        </Tab>
      </Tabs>
    </TabsVariantDark>

    <Logo />
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
