<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { Tabs, Tab } from '$ui/tabs';
  import Modal from '$ui/modal/Modal.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { user } from '$lib/user';
  import AccountHeader from './AccountHeader.svelte';

  export let skus: Sku[];
  export let products: Product[];

  let showDialog = false;
</script>

{#if $user}
  <AccountHeader userHandle={$user.username} on:edit={() => (showDialog = true)} />

  <Modal bind:open={showDialog} title="Edit Profile">
    <div class="text-gray-500 italic font-extrabold">
      Lorem ipsum dolor sit amet, adipiscing elit.
    </div>
    <div class="mt-2">
      <Input placeholder={$user.username} aria-label="Full name" class="font-black">
        <div slot="before" class="text-gray-400">@</div>
      </Input>
    </div>
    <div slot="actions">
      <Button on:click={() => (showDialog = false)}>Update username</Button>
    </div>
  </Modal>

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
