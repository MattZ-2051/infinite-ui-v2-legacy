<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
  import Logo from '$lib/components/Logo.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<div class="bg-black" style=" height: 65vh;">
  <div
    class="container flex relative h-full bg-cover bg-no-repeat  bg-center"
    style="background-image: url(/jabbar.png); background-position-y: 15%;"
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 md:transform-none md:left-16 bottom-5 md:bottom-12 flex flex-col items-center gap-4"
    >
      <div
        class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
        style="background-image: url(/jabbar-avatar.png);"
      />
      <div class="text-gray-400 text-2xl">@kaj33</div>
      <a
        sveltekit:prefetch
        href="/celebrity/sku"
        class="bg-gray-600 text-white hover:bg-gray-800 rounded-full text-sm px-5 py-2">Following</a
      >
    </div>
  </div>
</div>

<div class="bg-black flex-grow">
  <div class="container">
    <div class="flex md:justify-end mt-8">
      <div class="flex flex-col w-full md:w-1/2">
        <div class="text-white text-3xl font-light">
          I’ve come a long way to get here from Piscataway, New Jersey. But getting here isn’t
          enough.
        </div>

        <div class="text-gray-400 mt-10 md:mt-16">
          Proin at quam justo. Proin in ante ipsum. Morbi blandit orci ut metus consequat tempus.
          Vestibulum euismod libero non maximus venenatis. Mauris sed sem neque. Sed tincidunt massa
          et erat iaculis aliquam. Aliquam dui ante, accumsan eget metus vel, posuere rhoncus lacus.
          Ut iaculis orci sed facilisis semper. Phasellus porta sed arcu a sagittis. Nulla sit amet
          risus id lorem vulputate ornare eget sed dolor. Morbi vehicula tortor a iaculis.
        </div>
      </div>
    </div>

    <div class="mt-14">
      <TabsVariantDark>
        <Tabs class="text-xl md:text-2xl lg:text-3xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
          <Tab title="Latest Releases">
            <SkuItemVariantDark>
              <SkuItemGrid {skus} />
            </SkuItemVariantDark>
          </Tab>
          <Tab title="All Collections">
            <SkuItemVariantDark>
              <SkuItemGrid {products} />
            </SkuItemVariantDark>
          </Tab>
        </Tabs>
      </TabsVariantDark>
    </div>

    <Logo />
  </div>
</div>
