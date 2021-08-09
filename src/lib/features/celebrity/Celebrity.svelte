<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import Image from '$ui/image/Image.svelte';
  import { Pagination } from '$ui/pagination';
  import { page } from '$app/stores';
  import clemente21 from './clemente/clemente-21.png?w=640&format=avif;webp;png&metadata';
  import Issuer from './Issuer.svelte';
  import Clemente from './clemente/Clemente.svelte';
  import {
    products,
    productsTotal,
    loadProductsFx,
    skus,
    skusTotal,
    loadSkusFx,
    changeTab,
    changePage,
  } from './celebrity.store';

  export let profile: Profile;

  let productsLoading = loadProductsFx.pending;
  let skusLoading = loadSkusFx.pending;

  $: isIssuer = profile.role === 'issuer';

  $: p = +$page.query.get(`page`) || 1;

  $: tab = $page.query.get(`tab`) || (isIssuer ? 'Releases' : 'NFTs');

  function onSelectTab({ detail }: CustomEvent<'Releases' | 'NFTs'>) {
    changeTab(detail);
  }

  function onChangePage(event: CustomEvent) {
    changePage(event.detail.value);
  }

  let items = [{ id: 'NFTs', title: 'NFTs' }];
  $: if (isIssuer) {
    items.unshift({ id: 'Releases', title: 'Releases' });
    items = items;
  }
</script>

<ThemeContext id="celebrity">
  <div class="bg-black flex flex-col flex-grow">
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

      <Tabs {items} defaultSelectedId={tab} class="mb-4" on:select={onSelectTab}>
        <Tab id="Releases">
          {#if $skusTotal === 0}
            <div class="text-gray-200  text-center mt-12 text-2xl ">No releases found.</div>
          {:else if $skusTotal === null}
            <div class="text-gray-200 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
          {:else}
            <SkuItemGrid skus={$skus} class={$skusLoading ? 'opacity-40' : ''} />
            <Pagination
              perPage={8}
              total={$skusTotal}
              page={p}
              class="mt-4 flex justify-end"
              on:change={onChangePage}
            />
          {/if}
        </Tab>
        <Tab id="NFTs">
          {#if $productsTotal === 0 && !$productsLoading}
            <div class="text-gray-200  text-center mt-12 text-2xl ">No NFTs found.</div>
          {:else if $productsTotal === null}
            <div class="text-gray-200 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
          {:else}
            <SkuItemGrid products={$products} class={$productsLoading ? 'opacity-40' : ''} />
            <Pagination
              perPage={8}
              total={$productsTotal}
              page={p}
              class="mt-4 flex justify-end"
              on:change={onChangePage}
            />
          {/if}
        </Tab>
      </Tabs>

      {#if profile.username === 'Roberto_Clemente'}
        <Image src={clemente21} alt="Clemente's shirt" class="m-auto" />
      {:else}
        <Logo />
      {/if}
    </div>
  </div>
</ThemeContext>
