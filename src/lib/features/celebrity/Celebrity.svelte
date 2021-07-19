<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
  import { SkuItemGrid, SkuItemVariantDark } from '$lib/sku-item';
  import Logo from '$lib/components/Logo.svelte';
  import Image from '$ui/image/Image.svelte';
  import clemente21 from '$static/clemente-21.png?w=640&format=avif;webp;png&metadata';
  import Issuer from './Issuer.svelte';
  import Clemente from './Clemente.svelte';

  export let profile: Profile;
  export let skus: Sku[];
  export let products: Product[];

  $: isIssuer = profile.role === 'issuer';
</script>

<div class="bg-black">
  <div class="container ">
    {#if profile.username === 'Roberto_Clemente'}
      <Clemente />
    {:else if isIssuer}
      <Issuer {profile} />
    {:else}
      <div class="flex justify-center items-center" style=" height: 20vh;">
        <div class="text-gray-200 text-3xl">@{profile.username}</div>
      </div>
    {/if}

    <div class="flex-grow">
      <div class="">
        <TabsVariantDark>
          <Tabs class="text-xl md:text-2xl lg:text-3xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
            {#if isIssuer}
              <Tab title="Releases">
                <SkuItemVariantDark>
                  <SkuItemGrid {skus} />
                </SkuItemVariantDark>
              </Tab>
            {/if}
            <Tab title="NFTs">
              <SkuItemVariantDark>
                <SkuItemGrid {products} />
              </SkuItemVariantDark>
            </Tab>
          </Tabs>
        </TabsVariantDark>
      </div>

      {#if profile.username === 'Roberto_Clemente'}
        <Image src={clemente21} alt="Clemente's shirt" class="m-auto" />
      {:else}
        <Logo />
      {/if}
    </div>
  </div>
</div>
