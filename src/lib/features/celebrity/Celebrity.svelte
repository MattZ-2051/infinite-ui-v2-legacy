<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
  import Logo from '$lib/components/Logo.svelte';
  import { styles } from '$util/styles';

  export let profile: Profile;
  export let skus: Sku[];
  export let products: Product[];

  $: isIssuer = profile.role === 'issuer';
</script>

<div class="bg-black" style=" height: 65vh;">
  <div
    class="container flex relative h-full bg-cover bg-no-repeat  bg-center"
    style={styles({
      'background-image': profile.bannerPhotoUrl && `url(${profile.bannerPhotoUrl})`,
      'background-position-y': '15%',
    })}
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 md:transform-none md:left-16 bottom-5 md:bottom-12 flex flex-col items-center gap-4"
    >
      <div
        class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
        style={styles({ 'background-image': profile.midPhotoUrl && `url(${profile.midPhotoUrl})` })}
      />
      <div class="text-gray-400 text-2xl">@{profile.username}</div>
      <!-- <div class="bg-gray-600 text-white hover:bg-gray-800 rounded-full text-sm px-5 py-2">
        Following
      </div> -->
    </div>
  </div>
</div>

<div class="bg-black flex-grow">
  <div class="container">
    <div class="flex md:justify-end mt-8">
      <div class="flex flex-col w-full md:w-1/2">
        {#if profile.descriptionHeader}
          <div class="text-white text-3xl font-light">
            {profile.descriptionHeader}
          </div>
        {/if}
        {#if profile.descriptionBody}
          <div class="text-gray-400 mt-10 md:mt-16">
            {profile.descriptionBody}
          </div>
        {/if}
      </div>
    </div>

    <div class="mt-14">
      <TabsVariantDark>
        <Tabs class="text-xl md:text-2xl lg:text-3xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
          {#if isIssuer}
            <Tab title="Latest Releases">
              <SkuItemVariantDark>
                <SkuItemGrid {skus} />
              </SkuItemVariantDark>
            </Tab>
          {/if}
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
