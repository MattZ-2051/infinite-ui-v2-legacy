<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { closeModal, Modal } from '$ui/modals';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import RedeemForm from './RedeemForm.svelte';

  export let isOpen = false;
  export let product: Product;
</script>

{#if isOpen}
  <Modal title="Redeem this item!" on:close={closeModal}>
    <IconRedeem size="0.7" slot="icon" />
    <div class="flex flex-col px-10 py-2">
      <div class="flex gap-8 justify-between gray-border py-1">
        <span class="black-text text-xl my-2">{product.sku.name}</span>
        <Rarity rarity={product.sku.rarity} />
      </div>
      <div class="px-2 py-4">
        <RedeemForm id={product._id} on:close={closeModal} />
      </div>
    </div>
  </Modal>
{/if}

<style>
  .black-text {
    color: #000000;
  }

  .gray-border {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
</style>
