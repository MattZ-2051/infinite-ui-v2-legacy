<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import { user } from '$lib/user';
  import { openModal } from '$ui/modals';
  import AccountHeader from './AccountHeader.svelte';
  import AccountInfoModal from './AccountInfoModal.svelte';

  export let skus: Sku[];
  export let products: Product[];
  export let profile: Profile;

  function openEditModal() {
    openModal(AccountInfoModal, { profile });
  }
</script>

{#if $user}
  <AccountHeader {profile} on:edit={() => openEditModal()} />

  <div class="container mt-8 lg:mt-12">
    <Tabs class="text-xl md:text-2xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
      <Tab title="My Releases">
        <SkuItemGrid {skus} />
      </Tab>
      <Tab title="Items">
        <SkuItemGrid {products} />
      </Tab>
    </Tabs>
  </div>
{/if}
