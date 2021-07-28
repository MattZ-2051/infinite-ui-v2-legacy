<script lang="ts">
  import type { Bid, Listing, Product } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import { mdiStar } from '@mdi/js';
  import { formatCurrency, formatDate } from '$util/format';
  import { closeModal, Modal } from '$ui/modals';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import PaginationVariantDark from '$ui/pagination/variants/PaginationVariantDark.svelte';
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
  <Modal on:close={closeModal}>
    <div class="text-2xl font-medium text-center py-4" slot="title">
      Auction Bids
      <div class="text-gray-400 text-sm mt-4">
        Closed on {formatDate(listing.endDate)}
      </div>
    </div>
    <div class="w-full px-10">
      <div class="border border-gray-200 border-l-0 border-r-0 py-6">
        <ProductModalInfo sku={product.sku} serial={product.serialNumber} />
      </div>
      {#if bids.length > 0}
        {#each bids as bid}
          <div class="py-6 grid grid-cols-2 gap-2 items-center border-b border-gray-200" class:opacity-50={$loading}>
            <div class="text-lg font-semibold" class:text-gray-400={bid.status !== 'winner'}>
              @{bid.owner.username}
            </div>
            <div class="grid grid-cols-1 gap-1 justify-items-end">
              <div class="text-xl font-semibold flex items-center gap-2">
                {#if bid.status === 'winner'}
                  <Icon path={mdiStar} color="black" /> Won with {formatCurrency(bid.bidAmt)}
                {:else}
                  <span class="text-gray-400">Bid for </span>
                  {formatCurrency(bid.bidAmt)}
                {/if}
              </div>
              <div class="text-gray-400 text-sm">
                {formatDate(bid.updatedAt)}
              </div>
            </div>
          </div>
        {/each}
        <div class="flex justify-center w-full py-6">
          <PaginationVariantDark>
            <Pagination
              {page}
              {perPage}
              {total}
              on:change={async (event) => await onPaginationChanged(event.detail.value)}
            />
          </PaginationVariantDark>
        </div>
      {/if}
    </div>
  </Modal>
{/if}
