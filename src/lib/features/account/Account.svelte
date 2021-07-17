<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { TabHeader } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import { openModal } from '$ui/modals';
  import AccountHeader from './AccountHeader.svelte';
  import AccountInfoModal from './AccountInfoModal.svelte';

  export let products: Product[];
</script>

<AccountHeader on:edit={() => openModal(AccountInfoModal)} />

<div class="container mt-8 lg:mt-12">
  <nav class="text-2xl mb-2">
    <ul class="flex gap-10">
      <TabHeader active={true} class="pb-5">NFTs owned</TabHeader>
    </ul>
  </nav>

  {#if !products}
    <div class="text-2xl text-center my-16 opacity-60">Loading your NFTs...</div>
  {:else if products?.length === 0}
    <div class="text-2xl text-center my-16">You don't own any NFTs yet!</div>
  {:else}
    <SkuItemGrid {products} />
  {/if}
</div>

<style>
  nav {
    box-shadow: inset 0 -2px #ebebeb;
  }
</style>
