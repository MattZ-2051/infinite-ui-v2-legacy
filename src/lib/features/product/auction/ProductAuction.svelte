<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { gotoQueryParameters } from '$util/queryParameter';
  import UserLink from '$lib/components/UserLink.svelte';
  import { Pagination, PaginationVariantDark } from '$ui/pagination';
  import { page } from '$app/stores';
  import { user } from '$lib/user';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import { openModal } from '$ui/modals';
  import { formatCurrency } from '$util/format';
  import { loadingBids } from './auction.api';
  import { bids, totalBids, auctionStarted } from '../product.store';
  import BidForm from './BidForm.svelte';
  import BidModal from './BidModal.svelte';
  import UpcomingBid from './UpcomingBid.svelte';
  import NoAuction from './NoAuction.svelte';
  import { hasAuction } from '../product.service';

  export let product: Product;
  export let canBid: boolean;

  $: listing = hasAuction(product) && (product.activeProductListings?.[0] || product.upcomingProductListings?.[0]);
  $: p = +$page.query.get(`page`) || 1;

  const gotoPage = (event: CustomEvent) => {
    gotoQueryParameters(
      {
        params: { tab: 'auction', page: event.detail.value },
      },
      { noscroll: true, keepfocus: true }
    );
  };

  function onPlaceBid({ detail: { amount } }: { detail: { amount: number } }) {
    openModal(BidModal, {
      product,
      amount,
      user: $user,
    });
  }
</script>

{#if listing?.status === 'active'}
  {#if canBid}
    <BidForm {listing} on:place-bid={onPlaceBid} />
  {/if}
  <div class:opacity-40={$loadingBids}>
    {#if $totalBids > 0}
      <div class="mt-3">
        <div class="text-gray-500">
          {#each $bids as bid}
            <div
              class="grid-container group grid grid-cols-2 gap-x-2 items-center justify-items-start w-full h-20 space-between border-b border-gray-800 hover:border-white"
            >
              <span class="self-end font-black italic group-hover:text-white">
                <UserLink username={bid.owner?.username} class="font-semibold underline hover:no-underline" />
              </span>
              <div class="justify-self-end">
                Bid for <span class="text-white px-1">{formatCurrency(bid.bidAmt)}</span>
              </div>
              <span class="col-span-2 justify-self-end self-start font-black italic text-sm">
                <DateFormat value={bid.createdAt} />
              </span>
            </div>
          {/each}
        </div>
      </div>
      <PaginationVariantDark>
        <Pagination perPage={5} total={$totalBids} page={p} class="mt-4 flex justify-end" on:change={gotoPage} />
      </PaginationVariantDark>
    {:else if $totalBids === 0 && !$loadingBids}
      <div class="flex justify-center items-center text-2xl text-gray-400 my-20">No bids found</div>
    {/if}
  </div>
  <div class="text-center  text-gray-500   py-6 ">
    Started at <span class="text-white">{formatCurrency(listing.minBid)}</span> on
    <span class="font-black italic text-sm whitespace-nowrap"><DateFormat value={listing.startDate} /></span>
  </div>
{:else if listing?.status === 'upcoming'}
  <UpcomingBid
    minBidPrice={listing.minBid}
    bidStartDate={listing.startDate}
    on:zero={() => auctionStarted({ product })}
  />
{:else}
  <NoAuction {product} />
{/if}
