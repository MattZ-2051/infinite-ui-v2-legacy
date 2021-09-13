<script lang="ts">
  import type { Bid, Listing, Product } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import { mdiStar } from '@mdi/js';
  import { formatCurrency, formatDate } from '$util/format';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import Pagination from '$ui/pagination/Pagination.svelte';
  import { fetchBidsFx } from './auction.store';

  export let isOpen = false;
  export let product: Product;
  export let listing: Listing;

  const perPage = 5;

  let bids: Bid[] = [];
  let page = 1;
  let total: number;

  const loading = fetchBidsFx.pending;

  async function getBids(page_ = 1) {
    page = page_;

    ({ total, data: bids } = await fetchBidsFx({
      id: listing._id,
      page,
      perPage,
    }));
  }

  async function onPaginationChanged(page_: number) {
    await getBids(page_);
  }

  onMount(async () => {
    await getBids(1);
  });
</script>

{#if isOpen}
  <Modal title="Auction Bids" on:close={closeModal}>
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      <div class="text-black-opacity-60 text-sm mt-4">
        Closed on {formatDate(listing.endDate)}
      </div>
      <ProductModalInfo {product} sku={product.sku} />
      <div class="flex justify-center items-center bg-black h-72">
        <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
      </div>
      <div class="w-full">
        {#if bids.length > 0}
          {#each bids as bid}
            <div class="py-6 grid grid-cols-2 gap-2 items-center border-b border-gray-200" class:opacity-50={$loading}>
              <div class="text-lg" class:text-black-opacity-40={bid.status !== 'winner'}>
                @{bid.owner.username}
              </div>
              <div class="grid grid-cols-1 gap-1 justify-items-end">
                <div class="text-xl flex items-center gap-2">
                  {#if bid.status === 'winner'}
                    <Icon path={mdiStar} color="black" /> Won with {formatCurrency(bid.bidAmt)}
                  {:else}
                    <span class="text-black-opacity-40">Bid for </span>
                    {formatCurrency(bid.bidAmt)}
                  {/if}
                </div>
                <div class="text-black-opacity-40 text-sm">
                  {formatDate(bid.updatedAt)}
                </div>
              </div>
            </div>
          {/each}
          <div class="flex justify-center w-full py-6">
            <Pagination
              {page}
              {perPage}
              {total}
              on:change={async (event) => await onPaginationChanged(event.detail.value)}
            />
          </div>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
