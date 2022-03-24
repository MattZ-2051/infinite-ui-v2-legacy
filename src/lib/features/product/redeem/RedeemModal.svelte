<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import RedeemForm from './RedeemForm.svelte';

  export let isOpen = false;
  export let product: Product;

  let modalInstance: Modal;
</script>

{#if isOpen}
  <Modal title="Redeem this item!" bind:this={modalInstance}>
    <div class="px-10 flex flex-col gap-6 max-w-md">
      <div class="flex justify-center items-center bg-black h-72">
        <FilePreview item={product.nftPublicAssets?.[0] || product.sku.nftPublicAssets?.[0]} preview />
      </div>
      <ProductModalInfo sku={product.sku} {product} />
      <div class="pb-10">
        <RedeemForm id={product._id} on:close={modalInstance.close} />
      </div>
    </div>
  </Modal>
{/if}
