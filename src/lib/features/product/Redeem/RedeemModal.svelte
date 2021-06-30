<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import Modal from '$ui/modal/Modal.svelte';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import RedeemForm from './RedeemForm.svelte';

  export let product: Product;
  export let show = false;
</script>

<Modal bind:open={show}>
  <div class="flex flex-col " style="width:410px;">
    <div>
      <div class="flex justify-center items-center gap-3 mt-2 mb-3">
        <IconRedeem size="0.7" /><span class="black-text text-2xl tracking-tight">Redeem this item!</span>
      </div>
      <div class="flex  justify-between gray-border py-1">
        <span class="black-text text-xl my-2">{product.sku.name}</span>
        <Rarity rarity={product.sku.rarity} />
      </div>
      <RedeemForm
        id={product._id}
        on:close={() => {
          show = false;
        }}
      />
    </div>
  </div>
</Modal>

<style>
  .black-text {
    color: #000000;
  }

  .gray-border {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
</style>
