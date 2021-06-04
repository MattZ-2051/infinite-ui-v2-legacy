<script lang="ts">
  import Rarity from '$lib/rarity/Rarity.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
</script>

<div
  class="flex"
  style="min-height: 70vh; background: linear-gradient(45deg, rgb(2 71 99) 0%, rgb(146 1 162) 100%);"
>
  <div class="container p-0 grid gap-x-8 gap-y-2 grid-cols-1 md:grid-cols-2 items-stretch">
    <div class="bg-cover bg-no-repeat flex items-center">
      <img src="/jabbar-sku.png" alt="Jabbar SKU" class="w-full md:w-auto" />
    </div>
    <div class="container flex flex-col justify-between py-5 md:py-12">
      <div class="text-white">
        <div class="text-sm">
          Kareem Abdul Jabbar <span class="text-gray-300 ml-2">The Captain— Retro</span>
        </div>
        <div class="flex justify-between mt-12 md:mt-16">
          <div class="text-xl text-gray-400">KareemAbdulJabbar</div>
          <Rarity rarity="Legendary" class="font-bold text-lg" />
        </div>
        <div class="text-5xl mt-4">TheCaptain — Retro</div>

        <div class="mt-12 ">
          <div>Master Series</div>
          <div class="text-gray-400 mt-4 flex gap-2">
            <span>SKU: <span class="text-white">331KJE</span></span> <span>/</span>
            <span>20 to be released</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <div class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-2 gap-y-4 md:gap-y-12">
          <div class="flex-grow text-gray-400">
            <div class="text-2xl">From Creator</div>
            <div class="text-base">Initial Listing Price</div>
          </div>
          <div class="flex-none text-white text-center">
            <div class="text-3xl">$1.6k</div>
            <div class="text-sm">(11 left)</div>
          </div>
          <div class="flex-grow flex justify-center col-span-2 md:col-span-1">
            <a
              href="/"
              class="w-full max-w-xs text-center bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-base px-10 py-3 mb-12 md:mb-0"
              >Buy Now</a
            >
          </div>

          <div class="flex-grow text-gray-400">
            <div class="text-2xl">From Collectors</div>
            <div class="text-base">Lowest Listing Price</div>
          </div>
          <div class="flex-none text-white text-center">
            <div class="text-3xl">$1.4k</div>
            <div class="text-sm">(22 for sale)</div>
          </div>
          <div class="flex-grow flex justify-center col-span-2 md:col-span-1">
            <a
              href="/"
              class="w-full max-w-xs text-center bg-white text-black hover:bg-gray-500 hover:text-white rounded-full font-bold text-base px-10 py-3"
              >See All</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="mt-8">
  <div class="container grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <Tabs class="text-xl md:text-2xl lg:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Description">
          <div class="mt-4">
            <div>The Perception Shoe is now a Reality.</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at purus facilisis,
              varius tortor eget, cursus massa. Sed purus ipsum, sollicitudin sed viverra eget,
              porttitor eget velit.
            </div>
            <div>Upper:</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at purus facilisis,
              varius tortor eget, cursus massa. Sed purus ipsum, sollicitudin sed viverra eget,
              porttitor eget velit. Morbi sit amet vehicula ligula. Maecenas mattis.
            </div>
            <div>Cushioning:</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at purus facilisis,
              varius tortor eget, cursus massa. Sed purus ipsum, sollicitudin sed viverra eget,
              porttitor eget velit. Morbi sit amet vehicula ligula.
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    <div>
      <Tabs class="text-xl md:text-2xl lg:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
        <Tab title="Collector Auctions"><div class="mt-4" /></Tab>
      </Tabs>
    </div>
  </div>
</div>

<div class="mt-8">
  <div class="container">
    <Tabs class="text-xl md:text-2xl lg:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
      <Tab title="Latest Releases"><div><SkuItemGrid class="mt-4" max={4} /></div></Tab>
      <div slot="extra" class="text-lg">View all</div>
    </Tabs>
  </div>
</div>
