<script lang="ts">
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
</script>

<div class="hero relative bg-cover bg-center" style="height: min(50vw, 50vh);">
  <img
    src="/we_are_disruption.png"
    alt=""
    class="absolute top-0 right-0"
    style="height: min(90vw, 90vh);"
  />
</div>
<div class="flex-grow bg-cover text-white" style="background-image: url('/digital_bg.png');">
  <div class="hero-text container flex flex-col mt-8">
    <div
      class="flex flex-col text-right font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
    >
      <div>WELCOME TO</div>
      <div>THE ARIA EXCHANGE.</div>
    </div>
    <div class="flex justify-between">
      <img
        src="/Travis-Scott-iHeart-Radio.png"
        alt="Travis Scott"
        class="w-1/3 mt-40 hidden xl:block"
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
      <Tabs class="text-xl xl md:text-2xl lg:text-3xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Latest Releases"
          ><div><SkuItemVariantDark><SkuItemGrid class="mt-4" /></SkuItemVariantDark></div></Tab
        >
        <Tab title="All Collections">Tab 2!!!!!</Tab>
        <!-- <div slot="extra">extra data!!!</div> -->
      </Tabs>
    </TabsVariantDark>

    <div class="flex justify-end py-12 px-4">
      <img src="/aria-logo-comp.png" alt="" />
    </div>
  </div>
</div>

<style>
  .hero-text {
    padding-right: calc(0.16 * min(90vw, 90vh));
  }

  .hero {
    background-image: url('/landing.png');
  }

  .highlight-text {
    color: #9a9a9a;
  }
</style>
