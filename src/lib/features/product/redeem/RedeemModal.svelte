<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import RedeemForm from './RedeemForm.svelte';

  export let isOpen = false;
  export let product: Product;
</script>

{#if isOpen}
  <Modal title="Redeem this item!" on:close={closeModal}>
    <div class="px-10 flex flex-col gap-6 max-w-md">
      <div class="flex justify-center items-center bg-black h-72">
        <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
      </div>
      <ProductModalInfo sku={product.sku} {product} />
      <div class="pb-10">
        <RedeemForm id={product._id} on:close={closeModal} />
      </div>
    </div>
  </Modal>
{/if}
